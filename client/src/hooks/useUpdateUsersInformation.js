import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useUpdateUsersInformation() {
  return (firstName, lastName, email, id) => {
    return axios({
      url: urlUsed + '/foo/user/updateUsersInformation',
      method: 'post',
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        id: id
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
