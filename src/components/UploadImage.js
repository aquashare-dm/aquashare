import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import "./coreStyling.css";
import "./dashboardStyling.css";

import uploadPlaceholderImg from "./uploadImagePlaceholder.png"

const CLOUDINARY_UPLOAD_PRESET = 'vlmbsf3c'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dti2va41j/image/upload'

export default class UploadImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedFileCloudinaryUrl: '',
        };
    }

    onImageDrop = (files) => {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    }

    handleImageUpload = (file) => {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                }, () => {
                    this.props.handleImage(this.state.uploadedFileCloudinaryUrl)
                });

                if (this.props.action) {
                    this.props.action(response.body.secure_url)
                } else {
                    console.log('no props')
                }

            }
        });
        console.log("DELETE THIS TEST LINE");
    }

    handleOnCropChange = (crop) => {
        console.log(crop)
        this.setState({ crop: crop })
    }
    render() {
        console.log('prevProps: ', this.props)
        return (
            <div>
                <div className="FileUpload">
                    <Dropzone onDrop={acceptedFiles => this.onImageDrop(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                {this.state.uploadedFileCloudinaryUrl === '' ? 
                                
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <img src={uploadPlaceholderImg}/>
                                    <p>Drag and drop some files here, or click to select files</p>
                                </div>
                                
                                :
                                <div className="profileImageContBox" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <img className="profilePageProfPic" src={this.state.uploadedFileCloudinaryUrl}/>
                                </div>
                                }
                                
                            </section>
                        )}
                    </Dropzone>
                </div>
                <div>
                    
                </div>
            </div>

        )
    }
}