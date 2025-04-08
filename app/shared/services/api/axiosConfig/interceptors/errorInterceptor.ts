import type { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
    if(error.message === 'Network Error'){
        return Promise.reject(new Error('Erro de conexão.'))
    }
    if(error.response?.status === 401){
       // error de autenticaçao
    }

    return Promise.reject(error);
}