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

  request = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
      console.log(config);
      const response: AxiosResponse<T> = await this.axiosInstance({
        url: process.env.REACT_APP_API_PATH,
        ...config,
      });
      return response?.data;
    } catch (error) {
      console.error(error);
      throw new Error(error as any);
    }
  };
}

export default AxiosFacade;
