import React, { useState } from 'react';
import axios from "axios";
import { urlUsed } from "../constantes";

export default function VideoUploadForm() {
    const [fileVideo, setFileVideo] = useState(null);
    const [description, setDescription] = useState('');
  
    const handleFileChangeVideo = (e) => {
      setFileVideo(e.target.files[0]);
    };
  
    const handleDescriptionChangeVideo = (e) => {
      setDescription(e.target.value);
    };
  
    const handleUploadVideo = () => {
      if (fileVideo) {
        const formData = new FormData();
        formData.append('video', fileVideo);
        formData.append('description', description);
  
        axios.post(urlUsed+'/foo/uploadVideo/cours', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            console.log('Video uploaded successfully:', response.data);
          })
          .catch((error) => {
            console.error('Error uploading video:', error);
          });
      }
    };
    
    return (
        <div className="upload-container"> 
            <h2>Upload a Video</h2>
            <label htmlFor="file-upload" className="custom-file-upload">Choose Video</label>
            <input
                type="file"
                accept="video/*"
                id="file-upload"
                onChange={handleFileChangeVideo}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChangeVideo}
            />
            <button onClick={handleUploadVideo}>Upload</button>
        </div>
    );
}
