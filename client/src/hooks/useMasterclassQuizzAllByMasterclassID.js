import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMasterclassQuizzAllByMasterclassID() {
  return (id) => {
    return axios({
      url: urlUsed + '/foo/masterclassQuizzAllByMasterclassID',
      method: 'post',
      data: {
        id: id,
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
