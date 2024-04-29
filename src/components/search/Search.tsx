import React, { useCallback, useEffect, useState } from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ISearchProps } from './Search.types';

const SearchBar: React.FC<ISearchProps> = ({ onSearch }) => {
  const [city, setCity] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (city) {
      onSearch(city);
      // @ts-ignore
      const updatedHistory = [...new Set([city, ...history])];
      setHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
  }, [city, history, onSearch]);

  const removeFromHistory = useCallback((option: string) => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      const historyArray = JSON.parse(savedHistory);
      const updatedHistory = historyArray.filter((item: string) => item !== option);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    }
  }, []);

  return (
    <Box display="flex" justifyContent="center" my={4}>
      <Autocomplete
        freeSolo
        options={history}
        value={city}
        onInputChange={(event, newInputValue) => {
          setCity(newInputValue);
        }}
        onChange={(_, newValue) => {
          // @ts-ignore
          if (!newValue) return;
          setCity(newValue);
          handleSearch();
        }}
        fullWidth
        renderOption={(props, option, state) => (
          <ListItem {...props}>
            <ListItemText primary={option} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={(e) => removeFromHistory(option)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter a city"
            variant="outlined"
            fullWidth
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
            sx={{ width: '100%' }}
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;
