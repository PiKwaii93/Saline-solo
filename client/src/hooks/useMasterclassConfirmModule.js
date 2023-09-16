import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMasterclassConfirmModule() {
  return (userID, masterclassCoursID, page) => {
    return axios({
      url: urlUsed + '/foo/masterclassConfirmModule',
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
