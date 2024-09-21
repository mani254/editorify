class ImageUploader {
   constructor(containerId = null, maxImages = 5, maxFileSize = 2048, validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"], onImagesChange = null) {
      this.containerId = containerId
      this.maxImages = maxImages;
      this.maxFileSize = maxFileSize;
      this.validTypes = validTypes;

      this.images = [];
      this.previewImages = [];
      this.showUrlInput = false;
      this.url = "";
      this.isDragging = false;

      this.coverImageRefs = [];
      this.dragIndex = null;
      this.dragTimeout = null;

      this.onImagesChange = onImagesChange;
   }

   init() {
      window.addEventListener("resize", () => this.setCoverImageHeight());
      this.createContainer();
      this.setCoverImageHeight();
   }

   updateImages() {
      if (this.onImagesChange) {
         this.onImagesChange(this.images);
      }
   }

   createContainer() {
      if (!this.containerId) return null
      this.container = document.getElementById(this.containerId);
      this.container.classList.add('image-container')
      this.render();
   }

   setCoverImageHeight() {
      this.coverImageRefs.forEach(ref => {
         if (ref) {
            const width = ref.offsetWidth;
            ref.style.height = `${width}px`;
         }
      });
   }

   async fetchImageFromUrl(url) {
      try {
         const response = await fetch(url);
         if (!response.ok) {
            throw new Error("Image can't be fetched");
         }

         const contentType = response.headers.get("content-type");
         if (!contentType || !contentType.startsWith("image/")) {
            throw new Error("Response is not an image");
         }

         return await response.blob();
      } catch (err) {
         throw new Error("Image can't be fetched");
      }
   }

   getPreviewUrl(file) {
      if (!file) return null;
      return URL.createObjectURL(file);
   }

   async handleAddUrl(imgUrl) {
      if (!imgUrl) return;
      try {
         const image = await this.fetchImageFromUrl(imgUrl);

         if (image.size / 1024 > this.maxFileSize) {
            alert(`The image exceeds the maximum file size of ${this.maxFileSize} KB.`);
            return;
         }
         if (image) {
            if (this.validTypes.includes(image.type)) {
               this.images.push(image);
               let previewUrl = this.getPreviewUrl(image);
               this.previewImages.push(previewUrl);
               this.url = "";
               this.showUrlInput = false;
               this.render();
               this.updateImages();
            }
         }
      } catch (err) {
         alert("Can't load the image");
      }
   }

   async handleFileChange(event) {
      let files = Array.from(event.target.files);
      event.target.value = ""; // Reset the input value

      let sliceValue = this.maxImages - this.previewImages.length;
      if (sliceValue <= 0) {
         alert("Maximum number of images reached.");
         return; // Prevent further processing if max images reached
      }

      files = files.slice(0, sliceValue);

      for (const file of files) {
         if (file.size / 1024 > this.maxFileSize) {
            alert(`File ${file.name} exceeds the maximum file size of ${this.maxFileSize} KB.`);
            continue; // Skip this file
         }
         if (this.validTypes.includes(file.type)) {
            try {
               const image = await this.fetchImageFromUrl(URL.createObjectURL(file));
               this.images.push(image);
               const previewUrl = this.getPreviewUrl(image);
               this.previewImages.push(previewUrl);
               this.updateImages();
               this.render();
            } catch (err) {
               console.error("Error loading file:", err);
            }
         } else {
            alert("Invalid file type: " + file.name);
         }
      }
   }


   handleDelete(index) {
      this.previewImages.splice(index, 1);
      this.images.splice(index, 1);
      this.updateImages();
      this.render();
   }

   handleDragStart(index) {
      this.dragIndex = index;
      this.isDragging = true;
   }

   handleDragOver(index) {
      if (this.dragIndex === index) return;

      const newPreviewImages = [...this.previewImages];
      const draggedImage = newPreviewImages[this.dragIndex];
      newPreviewImages.splice(this.dragIndex, 1);
      newPreviewImages.splice(index, 0, draggedImage);

      const newImages = [...this.images];
      const draggedImg = newImages[this.dragIndex];
      newImages.splice(this.dragIndex, 1);
      newImages.splice(index, 0, draggedImg);

      this.previewImages = newPreviewImages;
      this.images = newImages;
      this.dragIndex = index;
      this.render();
   }

   handleDragEnd() {
      this.isDragging = false;
      this.dragIndex = null;
      clearTimeout(this.dragTimeout);
      this.updateImages()
      this.render();
   }

   render() {
      this.container.innerHTML = '';

      const imageGrid = document.createElement('div');
      imageGrid.className = 'image-grid';
      this.container.appendChild(imageGrid);


      if (this.previewImages.length === 0) {
         const emptyState = document.createElement('div');
         emptyState.className = 'empty-state';
         emptyState.innerHTML = `
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="60px" height="60px">
							<path d="M 31.306641 8.3085938 C 25.940641 8.3085938 21.574219 12.672062 21.574219 18.039062 L 21.574219 79.574219 C 21.574219 84.940219 25.940641 89.306641 31.306641 89.306641 L 74.841797 89.306641 C 80.208797 89.306641 84.574219 84.941172 84.574219 79.576172 L 84.574219 29.556641 C 84.574219 29.291641 84.46925 29.037609 84.28125 28.849609 L 64.035156 8.6015625 C 63.848156 8.4135625 63.594125 8.3085938 63.328125 8.3085938 L 31.306641 8.3085938 z M 31.306641 10.306641 L 62.574219 10.306641 L 62.574219 20.792969 C 62.574219 26.039969 66.843844 30.306641 72.089844 30.306641 L 82.574219 30.306641 L 82.574219 79.574219 C 82.574219 83.837219 79.105797 87.306641 74.841797 87.306641 L 31.306641 87.306641 C 27.043641 87.306641 23.574219 83.838219 23.574219 79.574219 L 23.574219 18.039062 C 23.574219 13.776062 27.042641 10.306641 31.306641 10.306641 z M 63.574219 10.966797 L 81.912109 29.306641 L 72.089844 29.306641 C 67.393844 29.306641 63.574219 25.487969 63.574219 20.792969 L 63.574219 10.966797 z M 35.232422 15.265625 C 33.621422 15.265625 32.077578 15.767797 30.767578 16.716797 C 28.767578 18.164797 27.574219 20.497078 27.574219 22.955078 L 27.574219 75.617188 C 27.574219 79.856187 31.009422 83.306641 35.232422 83.306641 L 70.917969 83.306641 C 75.139969 83.306641 78.574219 79.856188 78.574219 75.617188 L 78.574219 57.806641 C 78.574219 57.530641 78.350219 57.306641 78.074219 57.306641 C 77.798219 57.306641 77.574219 57.530641 77.574219 57.806641 L 77.574219 75.619141 C 77.574219 79.307141 74.588969 82.308594 70.917969 82.308594 L 35.232422 82.308594 C 31.561422 82.308594 28.574219 79.307141 28.574219 75.619141 L 28.574219 22.955078 C 28.574219 20.817078 29.613516 18.789344 31.353516 17.527344 C 32.492516 16.702344 33.834422 16.265625 35.232422 16.265625 C 35.508422 16.265625 35.732422 16.041625 35.732422 15.765625 C 35.732422 15.489625 35.508422 15.265625 35.232422 15.265625 z M 38.007812 36.306641 C 35.562813 36.306641 33.574219 38.295234 33.574219 40.740234 L 33.574219 67.099609 C 33.510112 67.238141 33.506224 67.396237 33.574219 67.53125 L 33.574219 72.873047 C 33.574219 75.318047 35.563812 77.306641 38.007812 77.306641 L 44.880859 77.306641 C 44.8829 77.306666 44.884678 77.308594 44.886719 77.308594 C 44.889424 77.308594 44.891828 77.306685 44.894531 77.306641 L 69.140625 77.306641 C 71.585625 77.306641 73.574219 75.317047 73.574219 72.873047 L 73.574219 40.740234 C 73.574219 38.295234 71.584625 36.306641 69.140625 36.306641 L 38.007812 36.306641 z M 38.007812 37.306641 L 69.140625 37.306641 C 71.034625 37.306641 72.574219 38.847234 72.574219 40.740234 L 72.574219 62.611328 L 63.425781 49.101562 C 63.332781 48.963562 63.177719 48.880859 63.011719 48.880859 C 62.885719 48.893859 62.688703 48.965469 62.595703 49.105469 L 51.044922 66.585938 L 43.730469 56.494141 C 43.640469 56.371141 43.500609 56.294109 43.349609 56.287109 C 43.197609 56.271109 43.050219 56.341078 42.949219 56.455078 L 34.574219 65.925781 L 34.574219 40.740234 C 34.574219 38.847234 36.113813 37.306641 38.007812 37.306641 z M 45.574219 39.306641 C 42.265219 39.306641 39.574219 41.997641 39.574219 45.306641 C 39.574219 48.615641 42.265219 51.306641 45.574219 51.306641 C 48.882219 51.306641 51.574219 48.615641 51.574219 45.306641 C 51.574219 41.997641 48.883219 39.306641 45.574219 39.306641 z M 45.574219 40.306641 C 48.331219 40.306641 50.574219 42.549641 50.574219 45.306641 C 50.574219 48.063641 48.331219 50.306641 45.574219 50.306641 C 42.817219 50.306641 40.574219 48.063641 40.574219 45.306641 C 40.574219 42.549641 42.817219 40.306641 45.574219 40.306641 z M 78.074219 44.306641 C 77.798219 44.306641 77.574219 44.530641 77.574219 44.806641 L 77.574219 47.806641 C 77.574219 48.082641 77.798219 48.306641 78.074219 48.306641 C 78.350219 48.306641 78.574219 48.082641 78.574219 47.806641 L 78.574219 44.806641 C 78.574219 44.530641 78.350219 44.306641 78.074219 44.306641 z M 78.074219 49.306641 C 77.798219 49.306641 77.574219 49.530641 77.574219 49.806641 L 77.574219 55.806641 C 77.574219 56.082641 77.798219 56.306641 78.074219 56.306641 C 78.350219 56.306641 78.574219 56.082641 78.574219 55.806641 L 78.574219 49.806641 C 78.574219 49.530641 78.350219 49.306641 78.074219 49.306641 z M 63.015625 50.279297 L 72.535156 64.337891 C 72.545653 64.353466 72.562374 64.361015 72.574219 64.375 L 72.574219 72.873047 C 72.574219 74.766047 71.034625 76.308594 69.140625 76.308594 L 45.818359 76.308594 L 63.015625 50.279297 z M 43.285156 57.585938 L 50.455078 67.476562 L 44.619141 76.308594 L 38.007812 76.308594 C 36.113812 76.308594 34.574219 74.766047 34.574219 72.873047 L 34.574219 67.435547 L 43.285156 57.585938 z" />
				</svg>
             <p>Upload images, drag and drop, or add from a URL.</p>
         `;
         imageGrid.appendChild(emptyState);

         const actionButtons = document.createElement('div')
         actionButtons.className = "action-buttons"

         const fileUpload = document.createElement('div');
         fileUpload.className = 'file-upload';

         const uploadButton = document.createElement('button');
         uploadButton.textContent = 'Add Files';

         const fileInput = document.createElement('input');
         fileInput.type = 'file';
         fileInput.multiple = true;
         fileInput.accept = "image/jpeg,image/png,image/webp,image/gif";
         fileInput.addEventListener('change', (e) => this.handleFileChange(e));

         uploadButton.addEventListener('click', () => fileInput.click());

         fileUpload.appendChild(uploadButton);
         fileUpload.appendChild(fileInput);

         actionButtons.appendChild(fileUpload)

         const urlToggleButton = document.createElement('button');
         urlToggleButton.className = 'url-toggle';
         urlToggleButton.textContent = 'Add From Url';
         urlToggleButton.addEventListener('click', () => {
            this.showUrlInput = !this.showUrlInput;
            this.render();
         });

         emptyState.appendChild(actionButtons);
         actionButtons.appendChild(urlToggleButton);
         imageGrid.appendChild(emptyState);

      } else {
         const imageItems = document.createElement('div');
         imageItems.className = 'image-items';
         imageGrid.appendChild(imageItems);

         this.coverImageRefs = [];

         this.previewImages.forEach((value, index) => {
            const coverImageWrapper = document.createElement('div');
            coverImageWrapper.className = `cover-image-wrapper ${this.isDragging && this.dragIndex === index ? "dragging" : ""}`;
            coverImageWrapper.draggable = true;

            this.coverImageRefs.push(coverImageWrapper);

            coverImageWrapper.ondragstart = () => this.handleDragStart(index);
            coverImageWrapper.ondragover = (e) => {
               e.preventDefault(); // This allows for dropping
               this.handleDragOver(index);
            };
            coverImageWrapper.ondragend = () => this.handleDragEnd();

            const img = document.createElement('img');
            img.src = value;
            img.alt = "product-image";

            const deleteButton = document.createElement('div');
            deleteButton.className = 'delete';
            deleteButton.onclick = () => this.handleDelete(index);
            deleteButton.innerHTML = `
                   <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 255.99556 255.99556" width="16px" height="16px" fillRule="nonzero">
								<g fillOpacity="0.98039" fill="#bd3d21" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
									<g transform="scale(10.66667,10.66667)">
											<path d="M10.80664,2c-0.517,0 -1.01095,0.20431 -1.37695,0.57031l-0.42969,0.42969h-5c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h16c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-5l-0.42969,-0.42969c-0.365,-0.366 -0.85995,-0.57031 -1.37695,-0.57031zM4.36523,7l1.52734,13.26367c0.132,0.99 0.98442,1.73633 1.98242,1.73633h8.24805c0.998,0 1.85138,-0.74514 1.98438,-1.74414l1.52734,-13.25586z" />
									</g>
								</g>
						</svg>
               `;

            coverImageWrapper.appendChild(img);
            coverImageWrapper.appendChild(deleteButton);
            imageItems.appendChild(coverImageWrapper);
         });

         if (this.previewImages.length < this.maxImages) {
            const addBlock = document.createElement('div');
            addBlock.className = 'cover-image-wrapper add-block';
            const uploadButton = document.createElement('button');
            this.coverImageRefs.push(addBlock);

            uploadButton.textContent = 'Add Files';

            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.multiple = true;
            fileInput.accept = "image/jpeg,image/png,image/webp,image/gif";
            fileInput.addEventListener('change', (e) => this.handleFileChange(e));

            uploadButton.addEventListener('click', () => fileInput.click());

            const urlToggleButton = document.createElement('button');
            urlToggleButton.className = 'url-toggle';
            urlToggleButton.innerHTML = 'Add From Url';
            urlToggleButton.onclick = () => {
               this.showUrlInput = !this.showUrlInput;
               this.render();
            };

            addBlock.appendChild(uploadButton);
            addBlock.appendChild(urlToggleButton);
            imageItems.appendChild(addBlock);
         }
      }

      if (this.showUrlInput && this.previewImages.length < this.maxImages) {
         const urlInputDiv = document.createElement('div');
         urlInputDiv.className = 'url-input';

         const urlInput = document.createElement('input');
         urlInput.placeholder = "Enter URL";
         urlInput.value = this.url;
         urlInput.onchange = (e) => this.url = e.target.value;
         urlInput.onkeypress = (e) => {
            if (e.key === "Enter") {
               this.handleAddUrl(this.url);
            }
         };

         const addImageButton = document.createElement('button');
         addImageButton.onclick = () => this.handleAddUrl(this.url);
         addImageButton.innerHTML = "Add Image";

         urlInputDiv.appendChild(urlInput);
         urlInputDiv.appendChild(addImageButton);
         imageGrid.appendChild(urlInputDiv);
      }
      this.setCoverImageHeight()
   }

   getImages() {
      return this.images;
   }
}

module.exports = ImageUploader