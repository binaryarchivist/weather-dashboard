import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

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

  request = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance({ ...config });
      return response?.data;
    } catch (error) {
      throw new Error(error as any);
    }
  };
}

export default AxiosFacade;
