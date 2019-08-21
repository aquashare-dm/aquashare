import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'

const CLOUDINARY_UPLOAD_PRESET = 'vlmbsf3c'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dti2va41j/image/upload'

export default class UploadImage extends Component {
    constructor(props) {
        super(props);
        // console.log('prrrrrooooooppppspss', props)

        this.state = {
            uploadedFileCloudinaryUrl: '',
        };
    }

    // componentWillReceiveProps(props) {
    //     console.log('prrrrrooooooppppspss', props)

    // }

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
                });
                if (this.props.action) {
                    this.props.action(response.body.secure_url)
                } else {
                    console.log('noooooooooo props')
                }

            }
        });
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
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <div>
                    {this.state.uploadedFileCloudinaryUrl === '' ? null :
                        <div>
                            {/* <p>{this.state.uploadedFile.name}</p> */}
                            <img src={this.state.uploadedFileCloudinaryUrl} />
                        </div>
                    }
                </div>
            </div>

        )
    }
}