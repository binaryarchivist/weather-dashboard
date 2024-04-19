import React, { useCallback, useState } from 'react';
import { TextField, Box } from '@mui/material';
import { ISearchProps } from './Search.types';

const SearchBar: React.FC<ISearchProps> = ({ onSearch }) => {
  const [city, setCity] = useState<string>('');

  const handleSearch = useCallback(() => {
    if (city) {
      onSearch(city);
    }
  }, [city, onSearch]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && city) {
        handleSearch();
      }
    },
    [handleSearch, city],
  );

  return (
    <Box display="flex" justifyContent="center" my={4}>
      <TextField
        label="Enter a city"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
        fullWidth
        sx={{ width: '100%', mr: 1 }}
      />
    </Box>
  );
};

export default SearchBar;
