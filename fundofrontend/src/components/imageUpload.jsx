import React, { Component } from 'react';
import { Tooltip } from '@material-ui/core';


class UploadImage extends Component {

    
    inputFile() {
        try{
        this.fileInput.click();
        }catch(err){
            console.log("error in file triggger");
        }
    }

    uploadImage(evt)
    {
        try{
        console.log("upload image",evt.target.files[0]);
        
        this.props.uploadImages(evt.target.files[0],this.props.note._id)
        }catch(err){
            console.log("error in upload image");
        }
    }
    render() {
        return (
            
            <span>
            <Tooltip title="Upload Image"> 
                <img src={require('../assets/images/addImageIcon.svg')}
                  alt="Add image"/>
                    onClick={() => { this.inputFile() }} />
            </Tooltip>
                <input ref={fileInput => this.fileInput = fileInput}
                    type="file" style={{ 'display': 'none' }}
                    className="uploadImage"
                    onChange={(evt)=>this.uploadImage(evt)}
                />

            </span>
        )
    }
}
export default UploadImage;