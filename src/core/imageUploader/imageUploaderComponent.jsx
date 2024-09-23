const React = require("react");
const { useEffect, useRef } = React;
const ImageUploader = require("./imageUploader");
require("./imageUploader.css");

const ImageUploaderComponent = ({ id, maxImages, maxFileSize, validTypes, onImagesChange, loadedImages }) => {
	const imageUploaderRef = useRef(null);

	useEffect(() => {
		if (imageUploaderRef.current) return;

		imageUploaderRef.current = new ImageUploader({ containerId: id, maxImages, maxFileSize, validTypes, onImagesChange, loadedImages });
		imageUploaderRef.current.init();

		return () => {
			imageUploaderRef.current = null;
		};
	}, [id]);

	return React.createElement("div", { id: id });
};

module.exports = ImageUploaderComponent;
