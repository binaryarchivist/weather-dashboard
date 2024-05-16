import React, { useCallback, useState } from 'react';
import { Box, Button, Grid, useTheme } from '@mui/material';

import { Toggle } from '../../components/toggle';
import SearchBar from '../../components/search/Search';
import { Card, ForecastCard } from '../../components/card';

import useAxios from '../../services/hooks/useAxios';

import { IWeatherInformation } from './Dashboard.types';
import { Endpoint } from '../../utils/constants';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR1bW15IiwicGVybWlzc2lvbnMiOlsiV1JJVEUiLCJSRUFEIl0sInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE1ODc5NDA2LCJleHAiOjE3MTU4ODMwMDZ9.BSQnNvew-GwYvyoi8Vc1QGygCtZAFnWqYAAqPXRPk1Y';

const Dashboard: React.FC = () => {
  const [weatherForecast, setWeatherForecast] = useState<IWeatherInformation>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const theme = useTheme();
  const axios = useAxios();

  const handleOnSearch = useCallback(
    async (city: string): Promise<void> => {
      try {
        const weatherForecast: IWeatherInformation = await axios.request<IWeatherInformation>({
          method: 'GET',
          // endpoint: Endpoint.FORECAST,
          params: {},
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        });

        setWeatherForecast(weatherForecast);
      } catch (e) {
        console.error(e);
      }
    },
    [axios],
  );

  const fetchWeatherData = useCallback(
    async (pageCursor: string) => {
      try {
        const response: any = await axios.request({
          method: 'GET',
          // endpoint: Endpoint.FORECAST,
          params: { cursor: pageCursor },
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
        setWeatherForecast((prev) => ({
          data: [...prev?.data, ...response?.data],
          nextCursor: response?.nextCursor,
        }));
      } catch (e) {
        console.error(e);
      }
    },
    [axios],
  );

  const handleNextPage = useCallback(async () => {
    if (weatherForecast?.nextCursor) {
      await fetchWeatherData(weatherForecast.nextCursor);
      setCurrentPage((prev) => prev + 1);
    }
  }, [fetchWeatherData, weatherForecast?.nextCursor]);

  // const handlePreviousPage = useCallback(async () => {
  //   if (weatherForecast?.previousCursor && currentPage > 1) {
  //     await fetchWeatherData(weatherForecast.previousCursor);
  //     setCurrentPage((prev) => prev - 1);
  //   }
  // }, [fetchWeatherData, weatherForecast?.previousCursor, currentPage]);

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
        <Card title="Weather forecast">
          <Grid container spacing={2}>
            {weatherForecast?.data?.map((weather: any, _id: string) => {
              return weather?.forecast?.forecastday?.map((day: any, index: number) => (
                <Grid item xs={12} sm={6} md={2} key={day?.date + index}>
                  <ForecastCard forecast={day} index={index} />
                </Grid>
              ));
            })}
          </Grid>
          <Box className="text-right">
            <Button onClick={handleNextPage} disabled={!weatherForecast?.nextCursor}>
              Next
            </Button>
          </Box>
        </Card>
      </div>
    </Box>
  );
};

export default Dashboard;
