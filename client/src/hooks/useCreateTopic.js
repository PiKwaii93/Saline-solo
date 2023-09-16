import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useCreateTopic() {
  return (infoTopic) => {
    return axios({
      url: urlUsed + '/foo/forum/createTopic',
      method: 'post',
      data: {
        title:infoTopic.title,
        categoryID:infoTopic.categoryID,
        text:infoTopic.text,
        userID:infoTopic.userID
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
