import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useGetImageByCertificatesID() {
    return (certificatesID) => {
      return axios({
        url: urlUsed + '/foo/media/getImageByCertificatesID',
        method: 'post',
        data: {
          certificatesID: certificatesID
        },
        responseType: 'blob', // Définissez responseType sur 'blob' pour obtenir une réponse de type Blob
      })
        .then((res) => {
          const blob = new Blob([res.data], { type: res.headers['content-type'] });
          return blob;
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    };
  }