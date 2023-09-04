import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMasterclassQuizz() {
  return (id, page) => {
    return axios({
      url: urlUsed + '/foo/masterclassQuizz',
      method: 'post',
      data: {
        id: id,
        page: page
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
