import React from 'react';

import { Card as MUICard, CardContent, CardHeader } from '@mui/material';

import { ICardProps } from './Card.types';

const Card: React.FC<ICardProps> = ({ title, children, className }) => {
  return (
    <MUICard className={className}>
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
    </MUICard>
  );
};

export default Card;
