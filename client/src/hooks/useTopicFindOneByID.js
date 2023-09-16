import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useTopicFindOneByID() {
  return (topicID) => {
    return axios({
      url: urlUsed + '/foo/forum/topicFindOneByID',
      method: 'post',
      data: {
        topicID: topicID,
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
