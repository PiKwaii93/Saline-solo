import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useUploadProfilPicture() {
  return (formData) => {
    return  axios.post(urlUsed+'/foo/uploadImage/profil', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}


