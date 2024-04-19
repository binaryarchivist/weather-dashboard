import React, { useCallback, useState } from 'react';
import { Box, useTheme } from '@mui/material';

import { Toggle } from '../../components/toggle';
import SearchBar from '../../components/search/Search';

import useAxios from '../../services/hooks/useAxios';

import { IWeatherInformation } from './Dashboard.types';
import { Endpoint } from '../../utils/constants';

const Dashboard: React.FC = () => {
  const [weatherInformation, setWeatherInformation] = useState<IWeatherInformation>();

  const theme = useTheme();
  const axios = useAxios();

  const handleOnSearch = useCallback(
    async (city: string) => {
      try {
        const response: IWeatherInformation = await axios.request<IWeatherInformation>({
          method: 'GET',
          endpoint: Endpoint.CURRENT_WEATHER,
          params: {
            key: process.env.REACT_APP_API_KEY,
            q: city,
          },
        });

        console.log('response: ', response);
        setWeatherInformation(response);
      } catch (e) {
        console.error(e);
      }
    },
    [axios],
  );

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        p: 4,
      }}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-5">
          <div className="flex-grow-0 flex-shrink">
            <Toggle />
          </div>
          <div className="flex-grow flex-basis-0">
            <SearchBar onSearch={handleOnSearch} />
          </div>
          <div className="flex-grow-0 flex-shrink">
            <Toggle />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;
