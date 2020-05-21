import React from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import "./croppedImage.css";

class CroppedImage extends React.Component {
    constructor() {
        super();
        this.state = {
            imageDestination: ""
        };
        this.cropper = null;
        this.imageElement = React.createRef();

    }

    componentDidMount() {
        this.cropper = new Cropper(this.imageElement.current, {
            aspectRatio: 16/9,
            autoCropArea: 0,
            strict: false,
            guides: false,
            highlight: false,
            dragCrop: false,
            cropBoxMovable: false,
            cropBoxResizable: false,
            crop: () => {
                const canvas = this.cropper.getCroppedCanvas({ width: "100", height: "50" });
                this.setState({ imageDestination: canvas.toDataURL("image/png") });
            }
        });
    }

    componentDidUpdate() {
        // this.cropper.destroy();
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <div className="img-container" >
                    <img ref={this.imageElement} src={this.props.image.file.src} alt="Source" />
                </div>
                <img src={this.state.imageDestination} className="img-preview" alt="Destination" />
            </div>
        );
    }

}

export default CroppedImage;