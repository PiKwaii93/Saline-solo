import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useUpdateMasterclassExamsQuestions() {
  return (dataForm, role) => {
    return axios({
      url: urlUsed + '/foo/updateMasterclassExamsQuestions',
      method: 'post',
      data: {
        questionID:dataForm.id, 
        idExamsQuestions:dataForm.idExamsQuestions, 
        masterclassExamsID:dataForm.masterclassExamsID, 
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
