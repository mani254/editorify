// src/core/editor/editor.js
class Editor {
   constructor(id) {
      this.id = id;
      this.createEditor();
   }

   createEditor() {
      const element = document.getElementById(this.id);
      if (element) {
         const editorDiv = document.createElement('div');
         editorDiv.className = 'editor';
         element.appendChild(editorDiv);
      }
   }
}

module.exports = Editor;
