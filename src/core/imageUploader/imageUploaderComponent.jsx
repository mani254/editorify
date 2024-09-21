const React = require("react");
const { useEffect } = React;
const ImageUploader = require("./imageUploader");
require("./imageUploader.css");

const ImageUploaderComponent = ({ id, maxImages, maxFileSize, validTypes, onImagesChange }) => {
	useEffect(() => {
		const imageUploderInstance = new ImageUploader({ containerId: id, maxImages, maxFileSize, validTypes, onImagesChange });
		imageUploderInstance.init();
	}, []);

	return React.createElement("div", { id: id });
};

module.exports = ImageUploaderComponent;
