import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMasterclassCheckConfirmModuleByUserID() {
  return (userID) => {
    return axios({
      url: urlUsed + '/foo/masterclassCheckConfirmModuleByUserID',
      method: 'post',
      data: {
        userID:userID
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
