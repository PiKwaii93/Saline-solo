import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMasterclassCheckConfirmModule() {
  return (userID, masterclassID) => {
    return axios({
      url: urlUsed + '/foo/masterclassCheckConfirmModule',
      method: 'post',
      data: {
        userID:userID, 
        masterclassID : masterclassID
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
