import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMasterclassFindOne() {
  return (slug) => {
    return axios({
      url: urlUsed + '/foo/masterclassFindOne',
      method: 'post',
      data: {
        slug: slug,
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
