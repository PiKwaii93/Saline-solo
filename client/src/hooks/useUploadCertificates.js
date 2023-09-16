import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useUploadCertificates() {
  return (formData) => {
    return  axios.post(urlUsed+'/foo/uploadImage/certificates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}


