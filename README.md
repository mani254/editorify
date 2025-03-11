# Editorify-Dev

**Editorify-Dev** is an open-source React library providing reusable UI components that enhance user experience and accelerate development. Designed for seamless integration, these components streamline common UI functionalities.

## Available Components

-  [FileUploader](#fileuploader)

---

## FileUploader

The `FileUploader` component offers an intuitive drag-and-drop interface for managing file uploads. It supports images, videos, PDFs, and documents, allowing users to reorder files before processing. This component does **not** automatically upload files to a server but provides an interface for users to handle file storage using the `onFilesChange` callback.

### Features

-  **Drag & Drop Support**: Easily upload files using drag-and-drop.
-  **File Previews**: Displays previews for images and videos.
-  **Reordering**: Users can reposition files before processing.
-  **Validation**: Supports `maxFiles`, `maxFileSize`, and `validTypes` for file restrictions.
-  **Preloaded Files**: Load initial files using the `loadedFiles` prop.

---

## Installation

Install the package using npm or yarn:

### Using npm

````bash
npm install editorify-dev

### Using yarn

```bash
yarn add editorify-dev
````

# Image Uploader

The image uploader component streamlines image uploads with a responsive UI ideal for web development and e-commerce. Users can easily drag and reposition images, ensuring a polished look. Its compatibility with any JavaScript environment makes it a must-have for seamless image management.

## Usage React

### Example component

```Javascript
import React, { useState } from "react";
import { FileUploader } from "editorify-dev";
import "editorify-dev/css/fileUploader";

function FileUploadComponent() {
    const [files, setFiles] = useState([]);

    const handleFilesChange = (updatedFiles) => {
        setFiles(updatedFiles);
        console.log("Updated files:", updatedFiles);
    };

    return (
        <div>
            <FileUploader
                id="file-uploader"
                onFilesChange={handleFilesChange}
                maxFiles={5} // Optional: Maximum number of files allowed
                maxFileSize={2048} // Optional: Maximum file size in KB
                validTypes={["image/jpeg", "image/png", "image/webp", "video/mp4", "application/pdf"]} // Allowed file types
                loadedFiles={["https://example.com/sample.pdf"]} // Optional: Preloaded files
            />
        </div>
    );
}

export default FileUploadComponent;
```

## Props

| Prop            | Type       | Required | Default Value | Description                                           |
| --------------- | ---------- | -------- | ------------- | ----------------------------------------------------- |
| `id`            | `string`   | Yes      | -             | A unique ID for the component.                        |
| `maxFiles`      | `number`   | No       | `-1`          | Maximum number of files allowed (`-1` for unlimited). |
| `maxFileSize`   | `number`   | No       | `-1`          | Maximum file size in KB (`-1` for no limit).          |
| `validTypes`    | `array`    | No       | Images only   | Allowed MIME types for uploaded files.                |
| `onFilesChange` | `function` | No       | -             | Callback function receiving the updated file list.    |
| `loadedFiles`   | `array`    | No       | -             | Array of file URLs to preload in the component.       |

## Additional Information

-  **`maxFiles`**: If set to `-1`, there is no limit on the number of files that can be uploaded.
-  **`maxFileSize`**: If set to `-1`, there is no file size restriction.
-  **`validTypes`**: Specifies the acceptable file types for upload.
-  **Preloaded Files**: Use `loadedFiles` to display existing files when initializing the component.

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License.
