import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMasterclassCheckConfirmModule() {
  return (userID, masterclassCoursID, page) => {
    return axios({
      url: urlUsed + '/foo/masterclassCheckConfirmModule',
      method: 'post',
      data: {
        userID:userID, 
        masterclassCoursID : masterclassCoursID,
        page: page
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
