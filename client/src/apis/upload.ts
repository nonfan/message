import axios from 'axios';
import { imageApiToken } from '../utils/config';

function uploadImage(file: any) {
  let formdata = new FormData();
  formdata.append('file', file);
  return axios({
    method: 'POST',
    url: 'https://picurl.cn/unionApi/upload',
    headers: {
      token: imageApiToken,
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
  });
}

function getNetworkImageUrl() {
  return axios({
    method: 'get',
    url: 'https://bing.ioliu.cn//v1/rand',
  });
}

export { getNetworkImageUrl, uploadImage };

