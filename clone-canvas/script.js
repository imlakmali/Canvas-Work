function handlFileSelect(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      const img = new Image();
      img.src = reader.result;

      img.onload = function () {

        _copyImage(img)

      };
    };
  }
}

function _copyImage(image){
  
  const sourceCanvas = document.getElementById("sourceCanvas");
  sourceCanvas.width = image.width;
  sourceCanvas.height = image.height;
  const sourceCtx = sourceCanvas.getContext("2d");
  sourceCtx.drawImage(image, 0, 0, image.width, image.height);

  const targetCanvas = document.getElementById("targetCanvas");
  targetCanvas.width = image.width * 2;
  targetCanvas.height = image.height * 2;
  const targetCtx = targetCanvas.getContext("2d");

  const sourceImg = sourceCtx.getImageData(0, 0, image.width, image.height);
  const targeteImg = targetCtx.getImageData(0,0,image.width,image.height);

  for (let i = 0; i < sourceImg.data.length; i += 4) {
    _copysinglePixel(targeteImg,sourceImg,i)
  }
   


  targetCtx.putImageData(targeteImg, image.width / 2, image.height / 2);

}


function _copysinglePixel(targeteImage,sourceImage,indx) {
  targeteImage.data[indx] = sourceImage.data[indx];
  targeteImage.data[indx+1] = sourceImage[indx+1];
  targeteImage.data[indx+2] = sourceImage.data[indx+2];
  targeteImage.data[indx+3] = sourceImage.data[indx+3];

}


document
  .getElementById("fileInput")
  .addEventListener("change", handlFileSelect);

  

//   //Get source

// //Get destinaion



// for ------ {

//   copy[0 + i]
//   copy[1 + 2]
//   ...
//   ....
  


// }




// //Copys a full pixel from one array to another
// copySinglePixel(foo, bar) {


// }


