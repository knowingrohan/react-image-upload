import React from "react";

class CroppedImage extends React.Component {
    state = {
        imgBlob: null
    }

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    cropImage = async (url, width, height) => {

        return await new Promise(resolve => {

            // this image will hold our source image data
            const inputImage = new Image();

            // we want to wait for our image to load
            inputImage.onload = () => {

                // let's store the width and height of our image
                const inputWidth = inputImage.naturalWidth;
                const inputHeight = inputImage.naturalHeight;

                // get the aspect ratio of the input image
                // const inputImageAspectRatio = inputWidth / inputHeight;

                // if it's bigger than our target aspect ratio
                let outputWidth = width;
                let outputHeight = height;
                // if (inputImageAspectRatio > aspectRatio) {
                // 	outputWidth = inputHeight * aspectRatio;
                // } else if (inputImageAspectRatio < aspectRatio) {
                // 	outputHeight = inputWidth / aspectRatio;
                // }

                // calculate the position to draw the image at
                const outputX = (outputWidth - inputWidth) * .5;
                const outputY = (outputHeight - inputHeight) * .5;

                // create a canvas that will present the output image
                const outputImage = document.createElement('canvas');

                // set it to the same size as the image
                outputImage.width = outputWidth;
                outputImage.height = outputHeight;

                // draw our image at position 0, 0 on the canvas
                const ctx = outputImage.getContext('2d');
                ctx.drawImage(inputImage, outputX, outputY);
                resolve(outputImage);
            };

            // start loading our image
            inputImage.src = url;
        });

    }
    render() {
        console.log(this.props);
        {
            this.cropImage(this.props.file.src, this.props.image.width, this.props.image.height)
                .then(canvas => {
                    let dataURL = canvas.toDataURL();
                    this.myRef.current.src = dataURL;
                    this.props.getCroppedImage(dataURL);
                })
        }
        return (
            <div className="image-container">
                <img ref={this.myRef} />
                <h2>{this.props.image.type}</h2>
            </div>
        );
    }

}

export default CroppedImage;