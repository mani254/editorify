const React = require("react");
const { useEffect, useRef } = React;
const Editor = require("./editor");
require("./editor.css");

const EditorComponent = ({ id, maxSteps, showCodeBlock, toolbarConfig, className }) => {
	const editorRef = useRef(null);

	useEffect(() => {
		if (editorRef.current) return;

		editorRef.current = new Editor({ containerId: id, maxSteps, showCodeBlock, toolbarConfig, className });
		editorRef.current.initialize();

		return () => {
			editorRef.current = null;
		};
	}, [id, maxSteps, showCodeBlock, toolbarConfig, className]);

	return React.createElement("div", { id: id, className: className });
};

module.exports = EditorComponent;
