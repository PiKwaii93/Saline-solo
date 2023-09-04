import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useNewUsersCertificates() {
  return (usersID, certificatesID) => {
    return axios({
      url: urlUsed + '/foo/newUsersCertificates',
      method: 'post',
      data:{
        usersID: usersID,
        certificatesID: certificatesID
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
