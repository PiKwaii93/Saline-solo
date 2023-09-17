import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMasterclassByID() {
  return (masterclassCoursID) => {
    return axios({
      url: urlUsed + '/foo/masterclassByID',
      method: 'post',
      data: {
        masterclassCoursID : masterclassCoursID
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
