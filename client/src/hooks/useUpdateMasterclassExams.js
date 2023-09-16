import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useUpdateMasterclassExams() {
  return (createExamsInfo) => {
    return axios({
      url: urlUsed + '/foo/updateMasterclassExams',
      method: 'post',
      data: {
        examsId:createExamsInfo.examsId, 
        idExams:createExamsInfo.idExams, 
        title:createExamsInfo.title, 
        masterclassID:createExamsInfo.masterclassID, 
        page:createExamsInfo.page,
        role: createExamsInfo.role
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
