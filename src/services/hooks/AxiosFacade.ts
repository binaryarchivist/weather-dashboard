import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ICustomAxiosRequest extends AxiosRequestConfig {
  endpoint?: string;
}

class AxiosFacade {
  axiosInstance;

  constructor(options: AxiosRequestConfig = {}) {
    this.axiosInstance = axios.create(options);
  }

  request = async <T>(config: ICustomAxiosRequest): Promise<T> => {
    try {
      console.log(config);
      const response: AxiosResponse<T> = await this.axiosInstance({
        url: `${process.env.REACT_APP_API_PATH}/${config.endpoint}`,
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
