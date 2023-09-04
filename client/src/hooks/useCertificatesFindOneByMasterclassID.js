import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useCertificatesFindOneByMasterclassID() {
  return (masterclassID) => {
    return axios({
      url: urlUsed + '/foo/certificatesFindOneByMasterclassID',
      method: 'post',
      data:{
        masterclassID: masterclassID
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
