function handlFileSelect(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      const image = new Image();
      image.src = reader.result;

      image.onload = function () {
        const sourceCanvas = document.getElementById("sourceCanvas");
        sourceCanvas.width = image.width;
        sourceCanvas.height = image.height;
        const sourceCtx = sourceCanvas.getContext("2d");
        sourceCtx.drawImage(image, 0, 0, image.width, image.height);

        const targetCanvas = document.getElementById("targetCanvas");
        targetCanvas.width = image.width * 2;
        targetCanvas.height = image.height * 2;
        const targetCtx = targetCanvas.getContext("2d");
        const sourceImage = sourceCtx.getImageData(0, 0, image.width, image.height);
        const targeteImage = targetCtx.getImageData(0,0,image.width,image.height);

        for (let i = 0; i < sourceImage.data.length; i += 4) {
          targeteImage.data[i] = sourceImage.data[i];
          targeteImage.data[i+1] = sourceImage[i+1];
          targeteImage.data[i+2] = sourceImage.data[i+2];
          targeteImage.data[i+3] = sourceImage.data[i+3];
        }

        targetCtx.putImageData(targeteImage, image.width / 2, image.height / 2);
      };
    };
  }
}
document
  .getElementById("fileInput")
  .addEventListener("change", handlFileSelect);
