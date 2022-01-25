import {
    ErrorResponse,
    ResponseBody,
} from "../../../types/response/response-body.interface";
import axios, { AxiosRequestConfig, Method } from "axios";

export class ApiService {
    public static async baseAction<T>(
        url: string,
        payload: Partial<AxiosRequestConfig>,
        method: Method = "GET"
    ): Promise<ResponseBody<T>> {
        try {
            const res: { data: ResponseBody<T> } = await axios({
                baseURL: process.env.SERVICE_BASE_URL || "localhost:3000/api",
                method,
                withCredentials: true,
                timeout: 60000,
                timeoutErrorMessage: "ETIMEOUT",
                url,
                data: payload.data || {},
                params: {
                    ...(payload.params || {}),
                },
                headers: {
                    ...payload.headers,
                },
            });
            return res.data;
        } catch ({ response: { data } }) {
            return <ErrorResponse<T>>data;
        }
    }
}
