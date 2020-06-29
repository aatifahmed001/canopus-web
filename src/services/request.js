import {storageService} from './storage';
import axios from 'axios';


const submit = (url, method, payload, queryObject) => {
    if (queryObject) {
        url = `${url}?${prepareParam(queryObject).join('&')}`;
    }

    url = `${process.env.REACT_APP_API_ENDPOINT_PROTOCOL}://${process.env.REACT_APP_API_ENDPOINT_BASE_SERVER}/${process.env.REACT_APP_ENDPOINT_BASE}/${url}`
    
    // KM: TODO: Need to use axios instance creation
    return axios({
        method: method,
        url: url
      })
        .then(function(response) {
            return response.data;
      });
}

const prepareParam = (params) => {
    let result = [];
    params.forEach(element => {
        result.push(encodeURIComponent(element.name) + '=' + encodeURIComponent(storageService.getDataByName(element.value)));
    });
    return result;
}

export const requestService = {
    submit,
    prepareParam
};