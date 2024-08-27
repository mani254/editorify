const ActionStack = require('./actionStack.js');
const { generateUniqueId, iconMap, renderToolbar, createContentWrapper, createCodeToggle } = require('./utilities/utilityFunctions.js')

class Editor {
   constructor({
      containerId = null,
      maxSteps = 30,
      showCodeBlock = true,
      toolbarConfig = {
         actions: ['undo', 'redo'],
         styles: ['bold', 'italic', 'underline', 'strikeThrough'],
         alignments: ['center', 'left', 'right', 'justify'],
         list: ['orderedList', 'unorderedList'],
         link: ['link']
      },
   } = {}) {
      if (!containerId) throw new Error('containerId is required');

      this.containerId = containerId;
      this.actionStack = new ActionStack(maxSteps);
      this.showCodeBlock = showCodeBlock;
      this.toolbarConfig = toolbarConfig;
      this.toolbarId = generateUniqueId();
      this.codeBlockId = generateUniqueId();
      this.contentAreaId = generateUniqueId();
   }

   async initialize() {
      const container = document.getElementById(this.containerId);
      if (!container) return;

      container.classList.add('editor');

      container.appendChild(this.createElement('div', 'toolbar', this.toolbarId, await renderToolbar(this)));
      container.appendChild(createContentWrapper(this));

      if (this.showCodeBlock) {
         container.appendChild(createCodeToggle());
      }
   }

   createElement(tag, className, id = null, child = null) {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (id) element.id = id;
      if (child) element.appendChild(child);
      return element;
   }

   handleToolbarAction(action) {
      switch (action) {
         case 'bold':
            console.log('bold function');
            break;
         case 'italic':
            console.log('italic function');
            break;
         default:
            console.log(`${action} is not yet implemented`);
      }
      this.updateCodeBlock();
   }

   updateCodeBlock() {
      const contentArea = document.getElementById(this.contentAreaId);
      const codeBlock = document.getElementById(this.codeBlockId);
      if (codeBlock) {
         codeBlock.textContent = contentArea.innerHTML;
      }
   }
}

module.exports = Editor;