
const { bold, italic, underline, strikeThrough, center, left, right, justify, orderedList, unorderedList, undo, redo, link } = require('./index.js');

const iconMap = {
   bold: bold,
   italic: italic,
   underline: underline,
   strikeThrough: strikeThrough,
   center: center,
   left: left,
   right: right,
   justify: justify,
   orderedList: orderedList,
   unorderedList: unorderedList,
   undo: undo,
   redo: redo,
   link: link
};

function renderToolbar(editorInstance) {
   const toolbarContainer = editorInstance.createElement('div', 'toolbar-container');

   for (const group in editorInstance.toolbarConfig) {
      const itemsContainer = editorInstance.createElement('div', group);
      editorInstance.toolbarConfig[group].forEach(item => {
         itemsContainer.appendChild(createToolbarButton(editorInstance, item));
      });
      toolbarContainer.appendChild(itemsContainer);
   }

   return toolbarContainer;
}

function createToolbarButton(editorInstance, action) {
   const button = editorInstance.createElement('div', action);
   const icon = editorInstance.createElement('img');
   icon.src = iconMap[action];
   icon.alt = `${action} icon`;
   button.appendChild(icon);

   button.addEventListener('click', () => editorInstance.handleToolbarAction(action));
   return button;
}

function createContentWrapper(editorInstance) {
   const contentWrapper = editorInstance.createElement('div', 'cd-wrapper');
   const contentArea = editorInstance.createElement('div', 'content-area active', editorInstance.contentAreaId);
   contentArea.contentEditable = true;
   contentWrapper.appendChild(contentArea);

   if (editorInstance.showCodeBlock) {
      const codeBlock = editorInstance.createElement('pre', 'code-block', editorInstance.codeBlockId); // Change to 'pre'
      codeBlock.setAttribute('contenteditable', true);
      codeBlock.addEventListener('input', () => {
         editorInstance.updateContentAreaFromCodeBlock();
      });
      contentWrapper.appendChild(codeBlock);
   }

   return contentWrapper;
}


function createCodeToggle() {
   const cdToggleWrapper = document.createElement('div', 'cd-toggle-wrapper');
   const textButton = document.createElement('button');
   textButton.innerText = 'Text';
   const codeButton = document.createElement('button');
   codeButton.innerText = 'Code';

   cdToggleWrapper.appendChild(textButton);
   cdToggleWrapper.appendChild(codeButton);

   return cdToggleWrapper;
}


function debounce(func, wait) {
   let timeout;

   return function (...args) {
      const later = () => {
         timeout = null;
         func.apply(this, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
   };
}

function formatHTML(html) {
   const indentSize = 2;
   let formatted = '';
   let indentLevel = 0;

   // Split HTML by tags while preserving the tags themselves
   const lines = html.split(/(<[^>]+>)/g).filter(line => line.trim().length > 0);

   lines.forEach((line) => {
      if (line.match(/^<\/(p|ul|li|a)>$/)) {
         // Closing tags that need a newline after them
         indentLevel -= 1;
         formatted += ' '.repeat(indentSize * indentLevel) + line.trim() + '\n\n';
      } else {
         if (line.match(/^<\/\w/)) {
            // Other closing tags: decrease indent level
            indentLevel -= 1;
         }

         formatted += ' '.repeat(indentSize * indentLevel) + line.trim();

         if (line.match(/^<\w(?!.*\/>)/)) {
            // Opening tags that are not self-closing: increase indent level
            indentLevel += 1;
         }

         // Add newline after content and tags that should not be inline
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

module.exports = { generateUniqueId, iconMap, renderToolbar, createContentWrapper, createCodeToggle, debounce, formatHTML }