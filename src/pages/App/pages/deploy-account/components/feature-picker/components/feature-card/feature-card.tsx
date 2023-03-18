import React from 'react';

import { Typography, Radio, Box } from '@mui/material';
import { grey, blue } from '@mui/material/colors';

import { FeatureCardProps } from './feature-card.types';

const FeatureCard = ({
  isSelected = false,
  title,
  description,
  onClick,
}: FeatureCardProps) => {
  return (
    <Box
      style={{
        padding: '8px 12px',
        border: `1px solid ${isSelected ? blue[500] : grey[200]}`,
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h6"
          style={{
            color: isSelected ? blue[500] : 'black',
          }}
        >
          {title}
        </Typography>
        <Radio sx={{ margin: 0 }} checked={isSelected}></Radio>
      </Box>
      <Box style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <Typography
          style={{
            color: isSelected ? blue[500] : 'black',
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeatureCard;
