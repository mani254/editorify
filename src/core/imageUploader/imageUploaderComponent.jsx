const React = require("react");
const { useEffect } = React;
const ImageUploader = require("./imageUploader");
require("./imageUploader.css");

const ImageUploaderComponent = ({ id = null, className = null, maxImages = 5, maxFileSize = 2048, validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"] }) => {
	useEffect(() => {
		const imageUploderInstance = new ImageUploader({ containerId: id, maxImages, maxFileSize, validTypes });
		imageUploderInstance.init();
	}, [id]);

	// console.log(id, className, maxImages, maxFileSize, validTypes);

	return React.createElement("div", { id: id, className: className });
};

module.exports = ImageUploaderComponent;
