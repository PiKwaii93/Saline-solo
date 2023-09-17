import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMasterclassConfirmModule() {
  return (userID, masterclassID, page) => {
    return axios({
      url: urlUsed + '/foo/masterclassConfirmModule',
      method: 'post',
      data: {
        userID:userID, 
        masterclassID : masterclassID,
        page: page
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
