import React from "react";
import { ImageUploaderComponent } from "editorify-dev/imageUploader";
import "editorify-dev/css/imageUploader";

function ImageUploader() {
	console.log("image uploader component");
	const handleImagesChange = (images) => {
		console.log(images);
	};

	return (
		<div>
			<ImageUploaderComponent id="fkjdlfj" onImagesChange={handleImagesChange} loadedImages={["https://news.ubc.ca/wp-content/uploads/2023/08/AdobeStock_559145847.jpeg"]} />
		</div>
	);
}

export default ImageUploader;
