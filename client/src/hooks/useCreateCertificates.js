import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useCreateCertificates() {
  return (createCertificatesInfo, role) => {
    return axios({
      url: urlUsed + '/foo/createCertificates',
      method: 'post',
      data: {
        masterclassID: createCertificatesInfo.masterclassID,
        title: createCertificatesInfo.title,
        role: role
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
