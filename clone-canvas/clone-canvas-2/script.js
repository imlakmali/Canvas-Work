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
  const sourceCanvas = document.getElementById("sourceCanvas");
  sourceCanvas.width = image.width;
  sourceCanvas.height = image.height;
  const sourceCtx = sourceCanvas.getContext("2d");
  sourceCtx.drawImage(image, 0, 0, image.width, image.height);

  const targetCanvas = document.getElementById("targetCanvas");
  targetCanvas.width = image.width;
  targetCanvas.height = image.height;
  const targetCtx = targetCanvas.getContext("2d");

  const sourceImg = sourceCtx.getImageData(0, 0, image.width, image.height);
  const targetImg = targetCtx.createImageData(image.width, image.height);

  _copysinglePixel(sourceImg, targetImg, image.width, image.height);
 
  targetCtx.putImageData(targetImg, 0, 0);
}




function _copysinglePixel(sourceImage, targetImage, width, height ){

  for (let y = 0; y < height; y++) {
  
      const pixel = readPixel(sourceImage.data, x, y, image.width);
      writePixel(targetImage.data, x, y, pixel, image.width);
    }
  }


function readPixel(sourceArr, x, y, width) {
  const index = (y * width + x) * 4;
  return {
    r: sourceArr[index],
    g: sourceArr[index + 1],
    b: sourceArr[index + 2],
    a: sourceArr[index + 3],
  };
}


function writePixel(targetArr, x, y, colorObj, width) {
  const index = (y * width + x) * 4;
  targetArr[index] = colorObj.r;
  targetArr[index + 1] = colorObj.g;
  targetArr[index + 2] = colorObj.b;
  targetArr[index + 3] = colorObj.a;
}



document.getElementById("fileInput").addEventListener("change", handleFileSelect);




