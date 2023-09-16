import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useCreateMasterclass() {
  return (createMasterclassInfo) => {
    return axios({
      url: urlUsed + '/foo/createMasterclass',
      method: 'post',
      data: {
        title:createMasterclassInfo.title,
        image:createMasterclassInfo.image,
        time:createMasterclassInfo.time,
        difficulty:createMasterclassInfo.difficulty,
        role:createMasterclassInfo.role
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
