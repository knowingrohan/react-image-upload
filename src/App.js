import React from 'react';
import CroppedImage from './components/CroppedImage';
import axios from 'axios';
import imgData from './imageData';


class App extends React.Component {

	constructor(props) {
		super(props)
		this.imgArr = []
	}

	state = {
		imageDimensions: false,
		imgBlob: null,
		selectedFile: null
	};

	// On file select (from the pop up) 
	onFileChange = event => {
		let img = event.target.files[0];

		let tempImg = new Image()
		tempImg.src = window.URL.createObjectURL(img)
		tempImg.onload = () => {
			if (tempImg.width === 1024 && tempImg.height === 1024) {
				this.setState({
					selectedFile: img,
					imgBlob: tempImg,
					imageDimensions: true
				});
			} else {
				this.setState({
					imageDimensions: false
				})
			}
		}


	};

	uploadFileToServer(imgUri) {

		const formData = new FormData();
		formData.append('file', imgUri)
		formData.append('upload_preset', 'testPreset');
		axios.post(
			'https://api.cloudinary.com/v1_1/rohanm789/image/upload',
			formData
		)
			.then(res => {
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			})
	}

	// On file upload (click the upload button) 
	handleFileUpload = async () => {

		for (let i = 0; i < this.imgArr.length; i++) {
			this.uploadFileToServer(this.imgArr[i])
		}

	};


	renderButtons = () => {

		if (this.state.imageDimensions) {
			return (
				<div>
					<button onClick={this.handleFileUpload}>
						Upload Images To Server
          			</button>
				</div>

			);
		} else {
			return (
				<div>
					<h5>Upload image with dimesnions 1024 x 1024</h5>
				</div>
			);
		}
	};

	getCroppedImage = (url) => {
		if (this.imgArr.length === 4) {
			this.imgArr = []
		}
		this.imgArr.push(url)
		console.log(this.imgArr);
	}

	render() {

		let croppedImages = imgData.map((item) => {
			return (<CroppedImage
				key={item.id}
				file={this.state.imgBlob}
				image={item}
				getCroppedImage={this.getCroppedImage}
			/>)
		});

		return (
			<div>
				<div className="button-container">
					<input
						style={{ display: 'none' }}
						type="file"
						onChange={this.onFileChange}
						ref={fileInput => this.fileInput = fileInput} />
					<button className="choose-file" onClick={() => this.fileInput.click()}>Choose File</button>
					{this.renderButtons()}
				</div>
				<div className="resolution-container" >
					{this.state.imageDimensions && croppedImages}
				</div>

			</div >
		);
	}
}

export default App; 
