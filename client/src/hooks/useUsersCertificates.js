import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useUsersCertificates() {
  return (usersID) => {
    return axios({
      url: urlUsed + '/foo/usersCertificates',
      method: 'post',
      data:{
        usersID: usersID
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
