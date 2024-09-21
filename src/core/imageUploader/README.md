# Image uploader component 
Editorify is A versatile open-source package providing reusable UI components for backend systems and development, including a powerful text-to-HTML editor ,intuitive image uploader, calendar etc. Designed to simplify content management and enhance user interfaces for e-commerce platforms and other web applications.

## Installation

To install the package, use either npm or yarn:
### Using npm
```bash
npm install editorify-dev
```
### Using yarn
```bash
yarn add editorify-dev
```
Make sure to include the CSS file for proper styling:
```Javascript
import "editorify-dev/css/imageUploader";
```
## Usage React
### importing the component
```Javascript
import React from "react";
import { ImageUploaderComponent } from "editorify-dev/imageUploader";
import "editorify-dev/css/imageUploader";
```
### Example component
```Javascript
function ImageUploader() {
	const handleImagesChange = (images) => {
		// Handle the updated images here
		console.log("Updated images:", images);
	};

	return (
		<div>
			<ImageUploaderComponent 
				id="fkjdlfj" 
				onImagesChange={handleImagesChange} 
				maxImages={5}         // Optional: Maximum number of images allowed
				maxFileSize={1024}    // Optional: Maximum file size in KB
				validTypes={["image/jpeg", "image/png", "image/webp", "image/gif"]} // Optional: Valid file types
			/>
		</div>
	);
}

export default ImageUploader;
```
## Usage in Standard HTML/JavaScript
You can also use the ImageUploader class directly in a standard HTML and JavaScript environment. Here’s how:
### HTML Example
``` HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="path/to/editorify-dev/css/imageUploader.css">
    <title>Image Uploader</title>
</head>
<body>
    <div id="image-uploader-container"></div>

    <script src="path/to/editorify-dev/imageUploader.js"></script>
    <script>
        const handleImagesChange = (images) => {
            console.log("Updated images:", images);
        };

        const uploader = new ImageUploader({
            containerId: 'image-uploader-container',
            maxImages: 5,
            maxFileSize: 1024,
            validTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
            onImagesChange: handleImagesChange
        });
    </script>
</body>
</html>
```
## Props
| Prop              | Type     | Required | Default Value | Description                                                             |
|-------------------|----------|----------|---------------|-------------------------------------------------------------------------|
| `id`              | `string` | Yes      | -             | A unique ID for the component's container.                              |
| `maxImages`       | `number` | No       | `-1`          | The maximum number of images that can be uploaded.                      |
| `maxFileSize`     | `number` | No       | `-1`          | The maximum file size (in KB) for uploaded images.                      |
| `validTypes`      | `array`  | No       | Default types | An array of valid MIME types for uploaded images.                       |
| `onImagesChange`  | `function` | No      | -             | Callback function that receives the updated images when the list changes. |


### Additional Information

- **`maxImages`**: If set to `-1`, there is no limit on the number of images that can be uploaded.
- **`maxFileSize`**: If set to `-1`, there is no limit on the file size of uploaded images.
- **`validTypes`**: This allows you to specify which types of images are accepted during the upload process.
