import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMasterclassExamsAllByMasterclassID() {
  return (id) => {
    return axios({
      url: urlUsed + '/foo/masterclassExamsAllByMasterclassID',
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
