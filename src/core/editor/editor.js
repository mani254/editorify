const ActionStack = require('./actionStack.js');

const { generateUniqueId } = require('./utilityFunctions.js');

class Editor {
   constructor({
      containerId = null,
      maxSteps = 30,
      showCodeBlock = true,
      toolbarConfig = {
         styles: ['bold', 'italic', 'underline', 'strikeThrough'],
         alignments: ['center', 'left', 'right', 'justify'],
         list: ['orderedList', 'unorderedList'],
      },
   } = {}) {
      this.actionStack = new ActionStack(maxSteps);
      this.showCodeBlock = showCodeBlock;
      this.toolbarConfig = toolbarConfig;
      this.containerId = containerId;
      this.toolbarId = generateUniqueId();
      this.codeBlockId = generateUniqueId();
      this.contentAreaId = generateUniqueId();
   }

   async initialize() {
      const container = document.getElementById(this.containerId);
      if (!container) return;

      container.classList.add('editor');

      const toolbarWrapper = document.createElement('div');
      toolbarWrapper.className = 'toolbar';
      toolbarWrapper.id = this.toolbarId;

      const toolbarElement = await this.renderToolbar();
      toolbarWrapper.appendChild(toolbarElement);
      container.appendChild(toolbarWrapper);

      const contentArea = document.createElement('div');
      contentArea.className = 'contentArea';
      contentArea.id = this.contentAreaId;
      contentArea.contentEditable = true;
      container.appendChild(contentArea);

      if (this.showCodeBlock) {
         const codeBlock = document.createElement('div');
         codeBlock.className = 'codeBlock';
         codeBlock.id = this.codeBlockId;
         container.appendChild(codeBlock);
      }
   }


   async renderToolbar() {
      const toolbarWrapper = document.createElement('div');
      toolbarWrapper.className = "toolbar-container";

      for (const group in this.toolbarConfig) {
         const itemsContainer = document.createElement('div');
         itemsContainer.className = group;

         for (const item of this.toolbarConfig[group]) {
            const button = document.createElement('button');
            button.className = item;
            button.innerText = item.charAt(0).toUpperCase() + item.slice(1);
            button.addEventListener('click', () => this.handleToolbarAction(item));
            itemsContainer.appendChild(button);
         }

         toolbarWrapper.appendChild(itemsContainer);
      }

      return toolbarWrapper;
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
      const editor = document.getElementById(this.containerId)
      const contentArea = document.getElementById(this.contentAreaId);
      const codeBlock = document.getElementById(this.codeBlockId);
      if (codeBlock) {
         codeBlock.textContent = contentArea.innerHTML;
      }
   }
}

module.exports = Editor;