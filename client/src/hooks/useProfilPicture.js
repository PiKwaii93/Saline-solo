import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useProfilPicture() {
  return (formData) => {
    return axios.post(urlUsed+'/foo/user/uploadImage/profil', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => res.data)
    .catch((res) => res.response.data);
    /* axios({
      url: urlUsed + '/foo/user/upload',
      method: 'post',
      data: {
        formData: formData,
      },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);*/
  }; 
}

