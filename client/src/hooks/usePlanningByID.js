import axios from 'axios';
import { urlUsed } from '../constantes';

export default function usePlanningByID() {
  return (planningEventID) => {
    return axios({
      url: urlUsed + '/foo/planning/planningByID',
      method: 'post',
      data: {
        planningEventID:planningEventID
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.data)
      .catch((res) => res.response.data);
  };
}
