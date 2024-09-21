# editorify-dev

Editorify is A versatile open-source package providing reusable UI components for backend systems and development, including a powerful text-to-HTML editor ,intuitive image uploader, calendar etc. Designed to simplify content management and enhance user interfaces for e-commerce platforms and other web applications.

## Table of Contents

-  [Installation](#installation)
-  Components
   -  [Image Uploader](#image-uploader)
   -  [Editor](#editor)
-  [Contributing](#contributing)
-  [License](#license)

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


# Image Uploader

The image uploader component streamlines image uploads with a responsive UI ideal for web development and e-commerce. Users can easily drag and reposition images, ensuring a polished look. Its compatibility with any JavaScript environment makes it a must-have for seamless image management.


## Usage React

### Example component

```Javascript
import React from "react";
import { ImageUploaderComponent } from "editorify-dev/imageUploader";
import "editorify-dev/css/imageUploader";

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


## Usage in standard HTML/Javasctipt or any js environment

Make sure to import css and image uploader form the package

```HTML
<body>
    <div id="image-uploader-container"></div>
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
```

### Props

| Prop             | Type       | Required | Default Value | Description                                                               |
| ---------------- | ---------- | -------- | ------------- | ------------------------------------------------------------------------- |
| `id`             | `string`   | Yes      | -             | A unique ID for the component's container.                                |
| `maxImages`      | `number`   | No       | `-1`          | The maximum number of images that can be uploaded.                        |
| `maxFileSize`    | `number`   | No       | `-1`          | The maximum file size (in KB) for uploaded images.                        |
| `validTypes`     | `array`    | No       | Default types | An array of valid MIME types for uploaded images.                         |
| `onImagesChange` | `function` | No       | -             | Callback function that receives the updated images when the list changes. |

### Additional Information

-  **`maxImages`**: If set to `-1`, there is no limit on the number of images that can be uploaded.
-  **`maxFileSize`**: If set to `-1`, there is no limit on the file size of uploaded images.
-  **`validTypes`**: This allows you to specify which types of images are accepted during the upload process.


# Editor

The text editor component offers a smooth and intuitive experience for creating and editing content, with automatic text-to-HTML conversion. It supports rich formatting options such as bold, italics, lists, and links, with real-time HTML preview. The editor is fully responsive and designed for easy integration into both React and standard HTML/JavaScript environments. Its customizable toolbar and clean, minimalistic interface make it an efficient and user-friendly solution for any web application requiring rich text editing and seamless HTML conversion.

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License.
