const ActionStack = require('./actionStack.js');
const { generateUniqueId, renderToolbar, createContentWrapper, createCodeToggle, debounce, formatHTML } = require('./utilities/utilityFunctions.js')

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
      this.updateCodeBlockDebounced = debounce(this.updateCodeBlock.bind(this), 1000);
   }

   async initialize() {
      const container = document.getElementById(this.containerId);
      if (!container) return;

      container.classList.add('editor');

      // const mainWrapper = this.createElement('div', 'content-wrapper', this.contentAreaId);
      // container.appendChild(mainWrapper);

      container.appendChild(this.createElement('div', 'toolbar', this.toolbarId, await renderToolbar(this)));
      container.appendChild(createContentWrapper(this));

      const contentArea = document.getElementById(this.contentAreaId);
      contentArea.addEventListener('input', () => this.updateCodeBlockDebounced());
      contentArea.addEventListener('keydown', (event) => this.handleKeyDown(event));

      if (this.showCodeBlock) {
         container.appendChild(createCodeToggle());
      }
   }

   handleKeyDown(event) {
      if (event.key === 'Enter') {
         event.preventDefault();
         this.handleEnterKey();
      }
   }

   handleEnterKey() {
      const contentArea = document.getElementById(this.contentAreaId);

      // Get the current selection and range
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      // If no element is selected, return
      if (!range.startContainer) return;

      // Check if there is content after the cursor
      const hasContentAfterCursor = range.startContainer.textContent.slice(range.startOffset).trim().length > 0;

      if (hasContentAfterCursor) {
         // Insert a <br> tag if there is content after the cursor
         const br = document.createElement('br');
         range.insertNode(br);
         range.setStartAfter(br);
      } else {
         // Create a new <p> element directly inside the content area
         const newParagraph = document.createElement('p');
         newParagraph.innerHTML = '<br>'; // Adding <br> to allow empty lines initially
         contentArea.appendChild(newParagraph);

         // Move the cursor to the new paragraph
         range.setStart(newParagraph, 0);
         range.setEnd(newParagraph, 0);
      }

      // Update the selection to reflect the changes
      selection.removeAllRanges();
      selection.addRange(range);



      this.updateCodeBlock();
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
            this.toggleBold()
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
         const formattedHTML = formatHTML(contentArea.innerHTML);
         codeBlock.textContent = formattedHTML;
      }
   }

   updateContentAreaFromCodeBlock() {
      const contentArea = document.getElementById(this.contentAreaId);
      const codeBlock = document.getElementById(this.codeBlockId);
      if (codeBlock && contentArea) {
         contentArea.innerHTML = codeBlock.textContent;
      }
   }

   toggleBold() {
      console.log('hello function is not implimented yet')
   }
}

module.exports = Editor;