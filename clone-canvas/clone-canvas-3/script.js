function handleFileSelect(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      const img = new Image();
      img.src = reader.result;
      
      img.onload = function () {
        _copyImage(img);
      };
    };
  }
}

function _copyImage(image) {
  // Get the sourceCanvas
  const sourceCanvas = document.getElementById("sourceCanvas");
  sourceCanvas.width = image.width;
  sourceCanvas.height = image.height;
  const sourceCtx = sourceCanvas.getContext("2d");

  // Draw the image into the sourceCanvas
  sourceCtx.drawImage(image, 0, 0, image.width, image.height);

  // Get the targetCanvas
  const targetCanvas = document.getElementById("targetCanvas");
  targetCanvas.width = image.width * 2;
  targetCanvas.height = image.height * 2;
  const targetCtx = targetCanvas.getContext("2d");

  // Get the image data from the sourceCanvas
  const sourceImg = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);

  // Create the new image data object for the targetCanvas
  const targetImg = targetCtx.createImageData(targetCanvas.width, targetCanvas.height);

  // Copy pixel from the source image data to target image data
  _copyPixel(sourceImg, targetImg, sourceCanvas.width, sourceCanvas.height, targetCanvas.width, targetCanvas.height);

  targetCtx.putImageData(targetImg, 0, 0);
}

// Copy each pixel from source image data to the target image data
function _copyPixel(sourceImage, targetImage, sourceWidth, sourceHeight, targetWidth, targetHeight) {
  const offsetX = Math.floor((targetWidth - sourceWidth) / 2);
  const offsetY = Math.floor((targetHeight - sourceHeight) / 2);

  for (let y = 0; y < sourceHeight; y++) {
    for (let x = 0; x < sourceWidth; x++) {
      const pixel = readPixel(sourceImage.data, x, y, sourceWidth);

      // Write each pixel to the target image data at the centered position
      writePixel(targetImage.data, x + offsetX, y + offsetY, pixel, targetWidth);
    }
  }
}

// Read each pixel color from source image data
function readPixel(sourceArr, x, y, width) {
  const index = (y * width + x) * 4;
  return {
    r: sourceArr[index],
    g: sourceArr[index + 1],
    b: sourceArr[index + 2],
    a: sourceArr[index + 3],
  };
}

// Write each pixel color to target image data
function writePixel(targetArr, x, y, colorObj, width) {
  const index = (y * width + x) * 4;
  targetArr[index] = colorObj.r;
  targetArr[index + 1] = colorObj.g;
  targetArr[index + 2] = colorObj.b;
  targetArr[index + 3] = colorObj.a;
}

document
  .getElementById("fileInput")
  .addEventListener("change", handleFileSelect);
