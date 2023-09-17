import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useGetMasterclassExamsAll() {
  return () => {
    return axios({
      url: urlUsed + '/foo/getMasterclassExxamsAll',
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
