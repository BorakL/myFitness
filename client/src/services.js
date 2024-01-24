import axios from 'axios';
import { apiURL } from './definitions';

axios.defaults.baseURL = `${apiURL}/api/v1/`;

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

// export const signup = function({service,data,headers,options}){
//     return axios({
//         method:"POST",
//         url:`users/${service}`,
//         data
//     })
// }


// //getOne 

// const getExercise = async()=>{ 
//     const exercise = await getOne({service:"exercises", id:"63dec38ec2a2fa12f0588318"})    
//     console.log("get",exercise )
//   } 
   
// const getAllExercises = async()=>{
//     const exercises = await getAll({service:"exercises", query:{skip:0, limit:5, }})
//     console.log("getAll",exercises)
// }
// // getAllExercises();

// const createWorkout = async()=>{
//   const newWorkout = await create({service:"workouts",
//     data:{ 
//       muscleGroups: [
//         "chest"
//       ], 
//       difficulty: "intermediate",
//       description: "axios test tincidunt enim eu sapien maximus, eget venenatis velit pulvinar",
//       exercises: [
//         {
//           exercise:  "63dec38ec2a2fa12f0588331",
//           sets: 4,
//           reps: 10
//         },
//         { 
//           exercise:"63dec38ec2a2fa12f058832d",
//           sets: 3,
//           reps: 10
//         },
//         {
//           exercise: "63dec38ec2a2fa12f0588332",
//           sets: 4,
//           reps: 12
//         } 
//       ],
//       author: "5c8a1e1a2f8fb814b56fa182" , 
//       ratingsAverage: 3,
//       ratingsQuantity: 9
//     }, 
//     headers:{
//       Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTUwOTMzNTY1NDkwMGYyOGY3YzZlMCIsImlhdCI6MTY3NTk2MDk1MSwiZXhwIjoxNjgzNzM2OTUxfQ.yLkeAIM5-XrIQf3m3FeT2QYEDOA5k8seTosX8GzzVU0'
//     }
//   })
//   console.log("newWorkout",newWorkout)
// }

// // createWorkout()



// const updateExercise = async()=>{
//   const updatedExercise = await update({
//     service:"workouts",
//     id:"63e99035862f1f31ec1fd9fd",
//     data:{description:"changed"},
//     headers:{
//       Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTUwOTMzNTY1NDkwMGYyOGY3YzZlMCIsImlhdCI6MTY3NTk2MDk1MSwiZXhwIjoxNjgzNzM2OTUxfQ.yLkeAIM5-XrIQf3m3FeT2QYEDOA5k8seTosX8GzzVU0'
//     }
//   })
//   console.log("updatedExercise",updatedExercise)
// }

// // updateExercise();
