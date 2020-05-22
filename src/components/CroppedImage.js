import React from "react";

class CroppedImage extends React.Component {

    cropImage = async (url, width, height) => {

        return await new Promise(resolve => {

            // this image will hold our source image data
            const inputImage = new Image();

            inputImage.onload = () => {

                const inputWidth = inputImage.naturalWidth;
                const inputHeight = inputImage.naturalHeight;
                let outputWidth = width;
                let outputHeight = height;

                // calculate the position to draw the image at
                const outputX = (outputWidth - inputWidth) * .5;
                const outputY = (outputHeight - inputHeight) * .5;

                const outputImage = document.createElement('canvas');

                // set it to the same size as the image
                outputImage.width = outputWidth;
                outputImage.height = outputHeight;

                const ctx = outputImage.getContext('2d');
                ctx.drawImage(inputImage, outputX, outputY);
                resolve(outputImage);
            };

            // start loading our image
            inputImage.src = url;
        });

    }

    render() {

        this.cropImage(this.props.file.src, this.props.image.width, this.props.image.height)
            .then(canvas => {
                let dataURL = canvas.toDataURL();
                this.imageRef.src = dataURL;
                this.props.getCroppedImage(dataURL);
            });

        return (
            <div className="image-container">
                <img ref={imageRef => this.imageRef = imageRef} alt={this.props.image.type} />
                <h2>{this.props.image.type}</h2>
            </div>
        );
    }

}

export default CroppedImage;