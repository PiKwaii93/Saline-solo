import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useCertificatesFindOneByCertificatesID() {
  return (certificatesID) => {
    return axios({
      url: urlUsed + '/foo/certificatesFindOneByCertificatesID',
      method: 'post',
      data:{
        certificatesID: certificatesID
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
