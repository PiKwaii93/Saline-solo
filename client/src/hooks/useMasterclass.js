import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMasterclass() {
  return (slug) => {
    return axios({
      url: urlUsed + '/foo/masterclass',
      method: 'get',
      data: {
        slug: slug,
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
