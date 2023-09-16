import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useCreateMasterclassQuizz() {
  return (createQuizzInfo, role) => {
    return axios({
      url: urlUsed + '/foo/createMasterclassQuizz',
      method: 'post',
      data: {
        idQuizz:createQuizzInfo.idQuizz, 
        title:createQuizzInfo.title, 
        masterclassID:createQuizzInfo.masterclassID, 
        page:createQuizzInfo.page,
        role: role
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
