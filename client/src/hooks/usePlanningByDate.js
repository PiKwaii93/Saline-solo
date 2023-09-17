import axios from 'axios';
import { urlUsed } from '../constantes';

export default function usePlanningByDate() {
  return (date) => {
    return axios({
      url: urlUsed + '/foo/planning/planningByDate',
      method: 'post',
      data: {
        date: date
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
