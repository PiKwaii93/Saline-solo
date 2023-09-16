import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useTopicAll() {
  return () => {
    return axios({
      url: urlUsed + '/foo/forum/topicAll',
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
