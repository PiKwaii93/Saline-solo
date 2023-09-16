import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useUpdateMasterclassQuizz() {
  return (createQuizzInfo) => {
    return axios({
      url: urlUsed + '/foo/updateMasterclassQuizz',
      method: 'post',
      data: {
        quizzId:createQuizzInfo.quizzId, 
        idQuizz:createQuizzInfo.idQuizz, 
        title:createQuizzInfo.title, 
        masterclassID:createQuizzInfo.masterclassID, 
        page:createQuizzInfo.page,
        role: createQuizzInfo.role
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
