import type { AxiosResponse } from "axios";

export const successInterceptor = (response: AxiosResponse) => {
    return response;
}