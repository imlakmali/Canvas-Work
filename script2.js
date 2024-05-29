function handleFileSelect(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () { 
      const img = new Image();
      img.src = reader.result;

      img.onload = function () {
        const sourceCanvas = document.getElementById("sourceCanvas");
        sourceCanvas.width = img.width;
        sourceCanvas.height = img.height;
        const sourceCtx = sourceCanvas.getContext("2d");
        sourceCtx.drawImage(img, 0, 0, img.width, img.height);

        const targetCanvas = document.getElementById("targetCanvas");
        const targetWidth = img.width + 200; 
        const targetHeight = img.height + 100; 
        targetCanvas.width = targetWidth;
        targetCanvas.height = targetHeight;
        const targetCtx = targetCanvas.getContext("2d");

        const imageX = (targetWidth - img.width) / 2;
        const imageY = (targetHeight - img.height) / 2;

        targetCtx.clearRect(0, 0, targetWidth, targetHeight);
        targetCtx.drawImage(img, imageX, imageY, img.width, img.height);
        targetCtx.strokeRect(imageX, imageY, img.width, img.height);
      };
    };
  }
}

document.getElementById("fileInput").addEventListener("change", handleFileSelect);