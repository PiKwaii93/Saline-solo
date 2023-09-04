import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useUpdateUsersPassword() {
  return (email, password, passwordConfirm, id) => {
    return axios({
      url: urlUsed + '/foo/user/updateUsersPassword',
      method: 'post',
      data: {
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        id: id
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
