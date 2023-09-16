import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useUpdateMasterclassCours() {
  return (createCoursInfo, coursID ) => {
    return axios({
      url: urlUsed + '/foo/updateMasterclassCours',
      method: 'post',
      data: {
        coursID:coursID, 
        text:createCoursInfo.text, 
        page:createCoursInfo.page, 
        masterclassID:createCoursInfo.masterclassID, 
        role: createCoursInfo.role
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
