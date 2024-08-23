import React from "react";
import { createRoot } from "react-dom/client";
import { EditorComponent } from "editorify-dev/editor";
import 'editorify-dev/editor/css';
const App = () => (
   <div>
      <h1>Editor Demo</h1>
      <EditorComponent id="editor-component" className="my-editor" />
   </div>
);


const container = document.getElementById("root");

const root = createRoot(container);
root.render(<App />);