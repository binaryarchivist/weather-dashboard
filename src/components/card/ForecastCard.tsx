import React, { useCallback, useMemo, useState } from 'react';

import {
  Card,
  Typography,
  Divider,
  CardContent,
  Button,
  Popover,
  ListItem,
  List,
  ListItemText,
} from '@mui/material';

const ForecastCard: React.FC<any> = ({ forecast, index }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPopover = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const formatDate = useCallback((dateStr: string, index: number): string => {
    const date = new Date(dateStr);
    if (index === 0) {
      return 'Today';
    }
    return new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(date);
  }, []);

  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const id = useMemo(() => (open ? 'simple-popover' : undefined), [open]);

  return (
    <Card sx={{ margin: 1, flex: 1 }}>
      <CardContent className="flex flex-col gap-1">
        <Typography variant="h6">{formatDate(forecast.date, index)}</Typography>
        <Typography variant="subtitle1">
          High: {forecast.day.maxtemp_c}°C / Low: {forecast.day.mintemp_c}°C
        </Typography>
        <img
          src={`https:${forecast.day.condition.icon}`}
          alt={forecast.day.condition.text}
          style={{ width: 50, height: 50 }}
        />
        <Typography variant="body2">{forecast.day.condition.text}</Typography>
        <Typography variant="body2">Rain: {forecast.day.daily_chance_of_rain}%</Typography>
        <Button onClick={handleOpenPopover} variant="outlined" color="primary" size="small">
          Hourly Details
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <List sx={{ maxWidth: 280, bgcolor: 'background.paper' }}>
            {forecast.hour.map((hour: any, index: number) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={`${hour.time.split(' ')[1]} - ${hour.temp_c}°C`}
                    secondary={
                      <div className="grid grid-cols-12 items-center justify-between">
                        <div className="col-span-6 flex items-center gap-2">
                          <img
                            src={`https:${hour.condition.icon}`}
                            alt={hour.condition.text}
                            style={{ width: 24, height: 24 }}
                          />
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {hour.condition.text}
                          </Typography>
                        </div>
                        <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                          Wind: {hour.wind_kph} kph {hour.wind_dir}
                        </Typography>
                      </div>
                    }
                  />
                </ListItem>
                {index < forecast.hour.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Popover>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
