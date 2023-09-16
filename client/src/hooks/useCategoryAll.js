import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useCategoryAll() {
  return () => {
    return axios({
      url: urlUsed + '/foo/forum/categoryAll',
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
