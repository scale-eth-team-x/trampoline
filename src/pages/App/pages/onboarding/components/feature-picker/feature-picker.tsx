import React, { useState } from 'react';
import {
  Box,
  Button,
  DialogActions,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import { FeaturePickerProps } from './feature-picker.types';
import FeatureCard from './components/feature-card';

const FeaturePicker = ({ onSubmit }: FeaturePickerProps) => {
  const [pickedFeatureIDs, setPickedFeatureIDs] = useState<Set<string>>(
    new Set<string>()
  );

  const handleSelectFeature = (featureID: string) => {
    const tempPickedFeatureIDs = new Set([...Array.from(pickedFeatureIDs)]);

    if (tempPickedFeatureIDs.has(featureID))
      tempPickedFeatureIDs.delete(featureID);
    else tempPickedFeatureIDs.add(featureID);

    setPickedFeatureIDs(tempPickedFeatureIDs);
  };

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Customize your wallet
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Before using your wallet, you have to deploy it with the features you
        need!
        <br />
        Once deployed, your smart contract wallet will be live with the features
        you desire. Be it transaction limit, extra authentication, the choice is
        yours!
        <br />
      </Typography>
      <Typography color="text.secondary">
        If you are a developer & want to build your own feature, learn more{' '}
        <Link>here</Link>
      </Typography>
      <div>
        <Box
          sx={{
            width: '100%',
            mb: 4,
          }}
        >
          {/* TODO: make this part interactive, depends on logic later */}
          <Typography align="left" sx={{ mb: 2 }}>
            Core Features by Wallet X (Verified)
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
          >
            <Grid item xs={12} md={6}>
              <FeatureCard
                onClick={() => handleSelectFeature('daily_limit_cs')}
                isSelected={pickedFeatureIDs.has('daily_limit_cs')}
                title="Daily Transaction Limit"
                description="Limit your daily transactions to prevent overshoots"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FeatureCard
                onClick={() => handleSelectFeature('2fa_cs')}
                isSelected={pickedFeatureIDs.has('2fa_cs')}
                title="2FA Auth"
                description="Secure your wallet with 2FA such as Google Auth or Polygon ID."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FeatureCard
                onClick={() => handleSelectFeature('usdt_gas_cs')}
                isSelected={pickedFeatureIDs.has('usdt_gas_cs')}
                title="USDT Gas"
                description="Pay your gases using USDT instead of the chain defaults."
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            width: '100%',
          }}
        >
          <Typography align="left" sx={{ mb: 2 }}>
            Crowdsource contract wallet (on your own risk)
          </Typography>
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
      </div>
      <Button fullWidth variant="contained" onClick={onSubmit} sx={{ mt: 4 }}>
        Submit
      </Button>
    </>
  );
};

export default FeaturePicker;
