const { bold, italic, underline, strikeThrough, center, left, right, justify, orderedList, unorderedList, undo, redo, link } = require('./index.js');

const iconMap = {
   bold,
   italic,
   underline,
   strikeThrough,
   center,
   left,
   right,
   justify,
   orderedList,
   unorderedList,
   undo,
   redo,
   link
};

function createElement(tag, className, id = null, child = null) {
   const element = document.createElement(tag);
   if (className) element.className = className;
   if (id) element.id = id;
   if (child) element.appendChild(child);
   return element;
}

function createToolbarButton(editorInstance, action) {
   const button = createElement('div', action);
   const icon = createElement('img');
   icon.src = iconMap[action];
   icon.alt = `${action} icon`;
   button.appendChild(icon);

   button.addEventListener('click', () => editorInstance.handleToolbarAction(action));
   return button;
}

function renderToolbar(editorInstance) {
   const toolbarContainer = createElement('div', 'toolbar-container');

   for (const group in editorInstance.toolbarConfig) {
      const itemsContainer = createElement('div', group);
      editorInstance.toolbarConfig[group].forEach(item => {
         itemsContainer.appendChild(createToolbarButton(editorInstance, item));
      });
      toolbarContainer.appendChild(itemsContainer);
   }

   return toolbarContainer;
}

function debounce(fn, delay) {
   let timeout;
   return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
   };
}

function updateCodeFromContent(editorInstance) {
   const contentArea = document.getElementById(editorInstance.contentAreaId);
   const codeBlock = document.getElementById(editorInstance.codeBlockId);
   if (codeBlock && contentArea) {
      const formattedHTML = formatHTML(contentArea.innerHTML);
      codeBlock.textContent = formattedHTML;
   }
}

function updateContentFromCode(editorInstance) {
   const contentArea = document.getElementById(editorInstance.contentAreaId);
   const codeBlock = document.getElementById(editorInstance.codeBlockId);
   if (codeBlock && contentArea) {
      contentArea.innerHTML = codeBlock.textContent;
   }
}

function createMainEditor(editorInstance) {
   const contentWrapper = createElement('div', 'cd-wrapper');

   const contentArea = createElement('div', 'content-area active c-part', editorInstance.contentAreaId);
   contentArea.contentEditable = true;
   const debouncedUpdateCode = debounce(() => updateCodeFromContent(editorInstance), 1000);
   contentArea.addEventListener('input', debouncedUpdateCode);
   contentWrapper.appendChild(contentArea);

   if (!editorInstance.showCodeBlock) return contentWrapper;

   const codeBlock = createElement('pre', 'code-block c-part', editorInstance.codeBlockId);
   codeBlock.setAttribute('contenteditable', true);
   const debouncedUpdateContent = debounce(() => updateContentFromCode(editorInstance), 1000);
   codeBlock.addEventListener('input', debouncedUpdateContent);
   contentWrapper.appendChild(codeBlock);

   return contentWrapper;
}

function createCodeToggle(editorInstance) {
   const cdToggleWrapper = createElement('div', 'cd-toggle-wrapper');

   const contentArea = document.getElementById(editorInstance.contentAreaId)
   const codeBlock = document.getElementById(editorInstance.codeBlockId)
   const textButton = createElement('button', 'toggle-button active', null, document.createTextNode('Text'));
   const codeButton = createElement('button', 'toggle-button', null, document.createTextNode('Code'));

   function handleButtonClick(event) {
      const clickedButton = event.target;

      textButton.classList.remove('active');
      codeButton.classList.remove('active');
      clickedButton.classList.add('active');

      if (clickedButton === textButton) {
         contentArea.classList.add('active');
         codeBlock.classList.remove('active');
      } else if (clickedButton === codeButton) {
         contentArea.classList.remove('active');
         codeBlock.classList.add('active');
      }
   }

   textButton.addEventListener('click', handleButtonClick);
   codeButton.addEventListener('click', handleButtonClick);

   cdToggleWrapper.appendChild(textButton);
   cdToggleWrapper.appendChild(codeButton);

   return cdToggleWrapper;
}


function formatHTML(html) {
   const indentSize = 2;
   let formatted = '';
   let indentLevel = 0;

   const lines = html.split(/(<[^>]+>)/g).filter(line => line.trim().length > 0);

   lines.forEach(line => {
      if (line.match(/^<\/(p|ul|li|a)>$/)) {
         indentLevel -= 1;
         formatted += ' '.repeat(indentSize * indentLevel) + line.trim() + '\n\n';
      } else {
         if (line.match(/^<\/\w/)) {
            indentLevel -= 1;
         }

         formatted += ' '.repeat(indentSize * indentLevel) + line.trim();

         if (line.match(/^<\w(?!.*\/>)/)) {
            indentLevel += 1;
         }

         if (!line.match(/<\w.*\/>/)) {
            formatted += '\n';
         }
      }
   });

   return formatted.trim();
}



function generateUniqueId(length = 5) {
   const possible = 'abcdefghijklmnopqrstuv';
   return Array.from({ length }, () => possible.charAt(Math.floor(Math.random() * possible.length))).join('');
}

module.exports = {
   generateUniqueId,
   iconMap,
   renderToolbar,
   createMainEditor,
   createCodeToggle,
   debounce,
   formatHTML,
   createElement,
   updateCodeFromContent,
   updateContentFromCode
};
