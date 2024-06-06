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
  //--get the sourseCanvas
  const sourceCanvas = document.getElementById("sourceCanvas");
  sourceCanvas.width = image.width;
  sourceCanvas.height = image.height;
  const sourceCtx = sourceCanvas.getContext("2d");

  //--drow the image into the sourseCanvas
  sourceCtx.drawImage(image, 0, 0, image.width, image.height);

 //--get the targetCanvas
  const targetCanvas = document.getElementById("targetCanvas");
  targetCanvas.width = image.width * 2;
  targetCanvas.height = image.height * 2;
  const targetCtx = targetCanvas.getContext("2d");

 //--get the image data frome the sourceCanvas
  const sourceImg = sourceCtx.getImageData(0, 0, image.width, image.height);

  //create the new image data object for a targetCanvas
  const targetImg = targetCtx.createImageData(image.width, image.height);

 
  //copy pixel from the source image data to target image data
  _copyPixel(sourceImg, targetImg, image.width, image.height);

  targetCtx.putImageData(targetImg, image.width/2, image.height/2);
}


//copy each pixel from sourse image data to the target image data
function _copyPixel(sourceImage, targetImage, width, height) {
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixel = readPixel(sourceImage.data, x, y, width);
      writePixel(targetImage.data, x, y, pixel, width);
      
    }
  }
}


//read the each pixel color from source image data
function readPixel(sourceArr, x, y, width) {
  const index = (y * width + x) * 4;
  return {
    r: sourceArr[index],
    g: sourceArr[index + 1],
    b: sourceArr[index + 2],
    a: sourceArr[index + 3],
  };
}


// write the each pixel color for target image data
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
