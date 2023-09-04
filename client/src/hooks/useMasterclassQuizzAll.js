import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMasterclassQuizzAll() {
  return (id) => {
    return axios({
      url: urlUsed + '/foo/masterclassQuizzAll',
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
