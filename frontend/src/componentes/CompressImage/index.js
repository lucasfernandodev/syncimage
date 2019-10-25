import Compress from 'compress.js';

const compress = new Compress();

export default async function CompressImage(img, _qld) {

    const files = [img];
    
    const response =  await compress.compress(files, {
        size: 5, // the max size in MB, defaults to 2MB
        quality: _qld, // the quality of the image, max is 1,
        maxWidth: 1920, // the max width of the output image, defaults to 1920px
        maxHeight: 1920, // the max height of the output image, defaults to 1920px
        resize: false, // defaults to true, set false if you do not want to resize the image width and height
      })
      return response[0];
};

