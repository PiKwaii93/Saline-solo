import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useTopicFindOneByCategory() {
  return (categoryID) => {
    return axios({
      url: urlUsed + '/foo/forum/topicFindOneByCategory',
      method: 'post',
      data: {
        categoryID: categoryID,
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
