import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useLogin() {
  return (email, password) => {
    return axios({
      url: urlUsed + '/foo/user/login',
      method: 'post',
      data: {
        email: email,
        password: password,
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
