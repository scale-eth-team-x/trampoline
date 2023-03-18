import {
  Box,
  Button,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { OnboardingComponent, OnboardingComponentProps } from '../types';

const Onboarding: OnboardingComponent = ({
  onOnboardingComplete,
}: OnboardingComponentProps) => {
  return (
    <Box sx={{ padding: 2 }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          You are all set!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Before using your wallet, you have to deploy it with the features you
          need!
          <br />
          Once deployed, your smart contract wallet will be live with the
          features you desire. Be it transaction limit, extra authentication,
          the choice is yours!
        </Typography>
      </CardContent>
      <CardActions sx={{ pl: 4, pr: 4, width: '100%' }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Button
            size="large"
            variant="contained"
            onClick={() => onOnboardingComplete()}
          >
            Continue
          </Button>
        </Stack>
      </CardActions>
    </Box>
  );
};

export default Onboarding;
