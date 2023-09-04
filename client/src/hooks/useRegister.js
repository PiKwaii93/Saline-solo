import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useRegister() {
  return (firstName, lastName, email, password, passwordConfirm) => {
    return axios({
      url: urlUsed + '/foo/user/register',
      method: 'post',
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
