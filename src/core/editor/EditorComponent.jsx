// src/core/editor/EditorComponent.jsx
const React = require("react");
const { useEffect } = React;
const Editor = require("./editor");
require("./editor.css");

const EditorComponent = ({ id }) => {
	useEffect(() => {
		new Editor(id);
	}, [id]);

	return React.createElement("div", { id: id, className: "editor-container" });
};

module.exports = EditorComponent;
