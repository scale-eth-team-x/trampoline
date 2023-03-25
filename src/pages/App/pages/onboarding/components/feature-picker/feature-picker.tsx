import React, { useEffect, useState } from 'react';
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
import useGetAllFactories from '../../../../hooks/factory-aggregator/use-get-all-factories';

const FeaturePicker = ({ onSubmit }: FeaturePickerProps) => {
  const [pickedFeatureIDs, setPickedFeatureIDs] = useState<Set<string>>(
    new Set<string>()
  );

  const { data, loading, error } = useGetAllFactories();

  const handleSelectFeature = (featureID: string) => {
    const tempPickedFeatureIDs = new Set([...Array.from(pickedFeatureIDs)]);

    if (tempPickedFeatureIDs.has(featureID))
      tempPickedFeatureIDs.delete(featureID);
    else tempPickedFeatureIDs.add(featureID);

    setPickedFeatureIDs(tempPickedFeatureIDs);
  };

  // hardcoded feature selection
  const handleSubmit = () => {
    let args = '';
    if (pickedFeatureIDs.size === 2) args = 'spendLimitAndSocialRecovery';
    else args = Array.from(pickedFeatureIDs)[0];

    onSubmit(args);
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
            {data.length === 2 && (
              <>
                <Grid item xs={12} md={6}>
                  <FeatureCard
                    onClick={() => handleSelectFeature('spendLimit')}
                    isSelected={pickedFeatureIDs.has('spendLimit')}
                    title={data[0].factoryName}
                    description={data[0].factoryDescription}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FeatureCard
                    onClick={() => handleSelectFeature('socialRecovery')}
                    isSelected={pickedFeatureIDs.has('socialRecovery')}
                    title={data[1].factoryName}
                    description={data[1].factoryDescription}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>

        {/* <Box
          sx={{
            width: '100%',
          }}
        >
          <Typography align="left" sx={{ mb: 2 }}>
            Crowdsource contract wallet (on your own risk)
          </Typography>

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
        </Box> */}
      </div>
      <Button
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 4 }}
        disabled={pickedFeatureIDs.size < 1}
      >
        Submit
      </Button>
    </>
  );
};

export default FeaturePicker;
