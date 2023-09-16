import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useUpdateMasterclassQuizzQuestions() {
  return (dataForm, role) => {
    return axios({
      url: urlUsed + '/foo/updateMasterclassQuizzQuestions',
      method: 'post',
      data: {
        questionID:dataForm.id, 
        idQuestion:dataForm.idQuestion, 
        masterclassQuizzID:dataForm.masterclassQuizzID, 
        question:dataForm.question, 
        answer1:dataForm.answer1, 
        answer2:dataForm.answer2, 
        answer3:dataForm.answer3, 
        answer4:dataForm.answer4, 
        correct:dataForm.correct,
        role:role
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
