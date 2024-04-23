import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { makePath } from '../../utils/functions';

interface ICustomAxiosRequest extends AxiosRequestConfig {
  endpoint: string;
}

class AxiosFacade {
  axiosInstance;

  constructor(options: AxiosRequestConfig = {}) {
    this.axiosInstance = axios.create(options);
  }

  setResponseInterceptor(
    onFulfilled?: (value: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>,
    onRejected?: (error: AxiosError) => any,
  ) {
    this.axiosInstance.interceptors.response.use(onFulfilled, onRejected);
  }

  request = async <T>(config: ICustomAxiosRequest): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance({
        url: makePath('https://', process.env.REACT_APP_API_PATH, config.endpoint),
        ...config,
      });
      return response?.data;
    } catch (error) {
      throw new Error(error as any);
    }
  };
}

export default AxiosFacade;
