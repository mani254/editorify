const React = require("react");
const { useEffect } = React;
const Editor = require("./editor");
require("./editor.css");

const EditorComponent = ({ id, maxSteps, showCodeBlock, toolbarConfig, className }) => {
	useEffect(() => {
		const editorInstance = new Editor({ containerId: id, maxSteps, showCodeBlock, toolbarConfig, className });
		editorInstance.initialize();
	}, [id]);

	return React.createElement("div", { id: id, className: className });
};

module.exports = EditorComponent;
