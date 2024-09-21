import React from "react";
import { ImageUploaderComponent } from "editorify-dev/imageUploader";
import "editorify-dev/css/imageUploader";

function ImageUploader() {
	const handleImagesChange = (images) => {};

	return (
		<div>
			<ImageUploaderComponent id="fkjdlfj" onImagesChange={handleImagesChange} />
		</div>
	);
}

export default ImageUploader;
