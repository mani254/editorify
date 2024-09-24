import React from "react";
import { ImageUploaderComponent } from "editorify-dev/imageUploader";
import "editorify-dev/css/imageUploader";

function ImageUploader() {
	console.log("image uploader component");
	const handleImagesChange = (images) => {
		console.log(images);
	};

	return (
		<div style={{ height: "95vh", display: "flex", alignItems: "center", background: "#f1f1f1" }}>
			<div style={{ width: "100%", maxWidth: "700px", margin: "auto" }}>
				<ImageUploaderComponent
					id="fkjdlfj"
					onImagesChange={handleImagesChange}
					//  loadedImages={["https://news.ubc.ca/wp-content/uploads/2023/08/AdobeStock_559145847.jpeg"]}
				/>
			</div>
		</div>
	);
}

export default ImageUploader;
