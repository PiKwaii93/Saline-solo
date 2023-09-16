import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMasterclassAll() {
  return () => {
    return axios({
      url: urlUsed + '/foo/masterclassAll',
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
