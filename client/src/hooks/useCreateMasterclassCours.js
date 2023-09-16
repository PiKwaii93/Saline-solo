import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useCreateMasterclassCours() {
  return (createCoursInfo) => {
    return axios({
      url: urlUsed + '/foo/createMasterclassCours',
      method: 'post',
      data: {
        text:createCoursInfo.text, 
        page:createCoursInfo.page, 
        masterclassID:createCoursInfo.masterclassID,
        role:createCoursInfo.role
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
