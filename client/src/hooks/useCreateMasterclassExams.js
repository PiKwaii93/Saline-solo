import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useCreateMasterclassExams() {
  return (createExamsInfo, role) => {
    return axios({
      url: urlUsed + '/foo/createMasterclassExams',
      method: 'post',
      data: {
        idExams:createExamsInfo.idExams, 
        title:createExamsInfo.title, 
        masterclassID:createExamsInfo.masterclassID, 
        page:createExamsInfo.page,
        role: role
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
