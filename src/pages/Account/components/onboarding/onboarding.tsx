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
        <Typography align="center" sx={{ margin: 1, color: grey[600] }}>
          If you are a developer & want to build your own feature, learn more{' '}
          <Link>here</Link>
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          {/* TODO: make this part interactive, depends on logic later */}
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
          >
            <Grid item xs={12} md={6}>
              <FeatureCard
                onClick={() => handleSelectFeature('daily_limit')}
                isSelected={pickedFeatureIDs.has('daily_limit')}
                title="Daily Transaction Limit"
                description="Limit your daily transactions to prevent overshoots"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FeatureCard
                onClick={() => handleSelectFeature('2fa')}
                isSelected={pickedFeatureIDs.has('2fa')}
                title="2FA Auth"
                description="Secure your wallet with 2FA such as Google Auth or Polygon ID."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FeatureCard
                onClick={() => handleSelectFeature('usdt_gas')}
                isSelected={pickedFeatureIDs.has('usdt_gas')}
                title="USDT Gas"
                description="Pay your gases using USDT instead of the chain defaults."
              />
            </Grid>
          </Grid>
        </Box>
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
