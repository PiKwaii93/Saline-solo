import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useUpdateMasterclass() {
  return ( masterclassId, title, image, time, difficulty ) => {
    return axios({
      url: urlUsed + '/foo/updateMasterclass',
      method: 'post',
      data: {
        masterclassId:masterclassId, 
        title:title, 
        image:image, 
        time:time, 
        difficulty:difficulty 
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
