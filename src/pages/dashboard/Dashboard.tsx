import React, { useCallback, useState } from 'react';
import { Box, Grid, useTheme } from '@mui/material';

import { Toggle } from '../../components/toggle';
import SearchBar from '../../components/search/Search';
import { Card, ForecastCard } from '../../components/card';

import useAxios from '../../services/hooks/useAxios';

import { IWeatherInformation } from './Dashboard.types';
import { Endpoint } from '../../utils/constants';

const Dashboard: React.FC = () => {
  const [weatherForecast, setWeatherForecast] = useState<IWeatherInformation>();

  const theme = useTheme();
  const axios = useAxios();

  const handleOnSearch = useCallback(
    async (city: string): Promise<void> => {
      try {
        const weatherForecast: IWeatherInformation = await axios.request<IWeatherInformation>({
          method: 'GET',
          endpoint: Endpoint.FORECAST,
          params: {
            key: process.env.REACT_APP_WEATHER_API_KEY,
            q: city,
            days: 10,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setWeatherForecast(weatherForecast);
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
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Card title="10 Day Weather forecast">
          <Grid container spacing={2}>
            {weatherForecast?.forecast?.forecastday?.map((day: any, index: number) => (
              <Grid item xs={12} sm={6} md={2} key={day.date}>
                <ForecastCard forecast={day} index={index} />
              </Grid>
            ))}
          </Grid>
        </Card>
      </div>
    </Box>
  );
};

export default Dashboard;
