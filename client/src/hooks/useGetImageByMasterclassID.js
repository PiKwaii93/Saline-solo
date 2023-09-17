import axios from 'axios';
import { urlUsed } from '../constantes';

export default function useGetImageByMasterclassID() {
    return (masterclassID) => {
      return axios({
        url: urlUsed + '/foo/media/getImageByMasterclassID',
        method: 'post',
        data: {
          masterclassID: masterclassID
        },
        responseType: 'blob',
      })
        .then((res) => {
          const blob = new Blob([res.data], { type: res.headers['content-type'] });
          return blob;
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    };
  }