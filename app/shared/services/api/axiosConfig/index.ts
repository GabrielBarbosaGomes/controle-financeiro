import axios from 'axios';
import { successInterceptor } from './interceptors/successInterceptor';
import { errorInterceptor } from './interceptors/errorInterceptor';
import { Environment } from '~/shared/environment';
// import { successInterceptor } from './interceptors';

// const coreApi = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     headers: { "Content-Type": "application/json" },
//   });
const coreApi = axios.create({
    baseURL: Environment.URL_BASE,
    headers: { "Content-Type": "application/json" },
  });

 


  coreApi.interceptors.response.use(
    (response) => successInterceptor(response),
    (error) => errorInterceptor(error)
  );

  export {coreApi};