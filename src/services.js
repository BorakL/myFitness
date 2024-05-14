import axios from 'axios';

axios.defaults.baseURL = `${process.env.REACT_APP_APIURL}/api/v1/`;

export const getOne = function ({service,id,headers,options}){
  return axios({
    method:'GET',
    url:`${service}/${id}`,
    headers: {'Authorization':headers},
    ...options
  })
}

export const getAll = function({service,query,headers,options}){
    return axios({
        method:"GET",
        url:service,
        params:query,
        headers: {'Authorization':headers},
        ...options
    })
}

export const create = function({service,url,id,data,headers,options}){
    // axios.defaults.headers.common = {'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTUwOTMzNTY1NDkwMGYyOGY3YzZlMCIsImlhdCI6MTY3NTk2MDk1MSwiZXhwIjoxNjgzNzM2OTUxfQ.yLkeAIM5-XrIQf3m3FeT2QYEDOA5k8seTosX8GzzVU0`}
    let u = url && id ? `${url}/${id}/${service}` : service;
    return axios({
        method:"POST",
        url:u,
        data,
        headers:{'Authorization':headers},
        ...options
    })
}

export const update = function({service,id,data,headers,options}){
    return axios({
        method:"PUT",
        url:`${service}/${id}`,
        data,
        headers:{'Authorization':headers},
        ...options
    })
}

export const users = function({service,data,headers,options}){
    return axios({
        method:"POST",
        url:`users/${service}`,
        data
    })
}
