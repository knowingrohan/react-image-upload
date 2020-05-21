// import axios from 'axios';

import React from 'react';
import CroppedImage from './components/CroppedImage';

var imgData = [{
	id: 1,
	type: 'horizontal',
	width: 755,
	height: 450
}
]
class App extends React.Component {

	state = {
		imageDimensions: false,
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
					selectedFile: tempImg,
					imageDimensions: true
				});
			} else {
				this.setState({
					imageDimensions: false
				})
			}
		}


	};

	// On file upload (click the upload button) 
	onFileUpload = () => {

		// Create an object of formData 
		// const formData = new FormData();

		// Update the formData object 
		// formData.append(
		// 	"myFile",
		// 	this.state.selectedFile,
		// 	this.state.selectedFile.name
		// );

		// Details of the uploaded file 
		console.log(this.state.selectedFile);

		// Request made to the backend api 
		// Send formData object 
		// axios.post("api/uploadfile", formData);
	};

	// File content to be displayed after 
	// file upload is complete 
	fileData = () => {

		if (this.state.imageDimensions) {
			return (
				<div>
					<button onClick={this.onFileUpload}>
						Upload!
          			</button>
				</div>

			);
		} else {
			return (
				<div>
					<br />
					<h4>Upload correct image size</h4>
				</div>
			);
		}
	};

	render() {

		let croppedImages = imgData.map((item) => {
			item.file = this.state.selectedFile
			return <CroppedImage key={item.id} image={item} />
		});

		return (
			<div>
				<input type="file" onChange={this.onFileChange} />
				<div className="resolution-container">
					{this.state.selectedFile && croppedImages}
				</div>
				{this.fileData()}
			</div >
		);
	}
}

export default App; 
