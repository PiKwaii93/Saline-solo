import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useCreateMasterclassExamsQuestions() {
  return (formData, role) => {
    return axios({
      url: urlUsed + '/foo/createMasterclassExamsQuestions',
      method: 'post',
      data: {
        idExamsQuestions:formData.idExamsQuestions, 
        masterclassExamsID:formData.masterclassExamsID, 
        question:formData.question, 
        answer1:formData.answer1, 
        answer2:formData.answer2, 
        answer3:formData.answer3, 
        answer4:formData.answer4, 
        correct:formData.correct,
        role:role
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
