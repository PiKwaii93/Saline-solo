import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useCreateMessage() {
  return (createMessageInfo) => {
    return axios({
      url: urlUsed + '/foo/forum/createMessage',
      method: 'post',
      data: {
        topicID: createMessageInfo.idTopic,
        userID: createMessageInfo.userID,
        text: createMessageInfo.text
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
