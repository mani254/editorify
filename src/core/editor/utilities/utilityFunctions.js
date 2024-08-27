
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
      const codeBlock = editorInstance.createElement('div', 'code-block', editorInstance.codeBlockId);
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


function generateUniqueId(length = 5) {
   const possible = 'abcdefghijklmnopqrstuv';
   return Array.from({ length }, () => possible.charAt(Math.floor(Math.random() * possible.length))).join('');
}

module.exports = { generateUniqueId, iconMap, renderToolbar, createContentWrapper, createCodeToggle }