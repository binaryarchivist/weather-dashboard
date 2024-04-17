import { useMemo } from 'react';

import AxiosFacade from './AxiosFacade';
import { AxiosRequestConfig } from 'axios';

const useAxios = (options?: AxiosRequestConfig) =>
  useMemo(() => {
    return new AxiosFacade({
      ...options,
      headers: {
        ...(options?.headers || {}),
      },
    });
  }, [options]);

export default useAxios;
