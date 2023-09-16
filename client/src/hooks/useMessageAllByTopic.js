import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useMessageAllByTopic() {
  return (topicID) => {
    return axios({
      url: urlUsed + '/foo/forum/messageFindOneByTopic',
      method: 'post',
      data:{
        topicID: topicID,
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
