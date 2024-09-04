const ActionStack = require('./actionStack.js');
const { generateUniqueId, renderToolbar, createMainEditor, createCodeToggle, createElement, updateCodeFromContent } = require('./utilities/utilityFunctions.js')

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
      if (!containerId) throw new Error('Editor component need to have an id');

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

      container.appendChild(createElement('div', 'toolbar', this.toolbarId, await renderToolbar(this)));
      container.appendChild(createMainEditor(this));

      const contentArea = document.getElementById(this.contentAreaId);

      if (this.showCodeBlock) {
         container.appendChild(createCodeToggle(this));
      }
   }

   handleToolbarAction(action) {
      switch (action) {
         case 'bold':
            console.log('bold function');
            this.toggleBold()
            break;
         case 'italic':
            console.log('italic function');
            break;
         default:
            console.log(`${action} is not yet implemented`);
      }
   }


   toggleBold() {
      console.log('hello function is not implimented yet')
   }
}

module.exports = Editor;