import React from "react";
import { EditorComponent } from "editorify-dev/editor";
import "editorify-dev/css/editor";

function Editor() {
	return (
		<div>
			<h1>Editor Demo</h1>
			<EditorComponent id="editor-component" className="my-editor"></EditorComponent>
		</div>
	);
}

export default Editor;
