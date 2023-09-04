import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMasterclassesCours() {
  return (id, page) => {
    return axios({
      url: urlUsed + '/foo/masterclasscours',
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
