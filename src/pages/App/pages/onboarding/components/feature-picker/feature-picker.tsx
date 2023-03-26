import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import { FeaturePickerProps } from './feature-picker.types';
import FeatureCard from './components/feature-card';
import featureConfig from '../../../../../../feature-config.json';
import useGetAllFactories from '../../../../hooks/factory-aggregator/use-get-all-factories';
import { red } from '@mui/material/colors';

const FeaturePicker = ({ onSubmit }: FeaturePickerProps) => {
  const [factoryAddresses, setFactoryAddresses] = useState<Set<string>>(
    new Set<string>()
  );

  const { data, loading, error } = useGetAllFactories();

  const handleSelectFeature = (featureID: string) => {
    const tempFactoryAddresses = new Set([...Array.from(factoryAddresses)]);

    if (tempFactoryAddresses.has(featureID))
      tempFactoryAddresses.delete(featureID);
    else tempFactoryAddresses.add(featureID);

    setFactoryAddresses(tempFactoryAddresses);
  };

  // hardcoded feature selection
  const handleSubmit = () => {
    let selectedAddress = '';
    if (factoryAddresses.size === 2)
      selectedAddress = featureConfig.spendLimitAndSocialRecovery.factory;
    else selectedAddress = Array.from(factoryAddresses)[0];

    onSubmit(selectedAddress);
  };

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && error && (
        <Typography variant="h6" gutterBottom color={red}>
          Cannot connect to chain!
        </Typography>
      )}
      {!loading && !error && (
        <>
          <Typography variant="h3" gutterBottom>
            Customize your wallet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Before using your wallet, you have to deploy it with the features
            you need!
            <br />
            Once deployed, your smart contract wallet will be live with the
            features you desire. Be it transaction limit, extra authentication,
            the choice is yours!
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
              <Typography align="left" sx={{ my: 2, fontWeight: 'bold' }}>
                Core Features by Wallet X (Verified)
              </Typography>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 1, md: 1 }}
              >
                <Grid item xs={12} md={6}>
                  <FeatureCard
                    onClick={() =>
                      handleSelectFeature(featureConfig.spendLimit.factory)
                    }
                    isSelected={factoryAddresses.has(
                      featureConfig.spendLimit.factory
                    )}
                    title={'Spend Limit'}
                    description={
                      'Limit your spending to prevent overshoots, keep your account safe!'
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FeatureCard
                    onClick={() =>
                      handleSelectFeature(featureConfig.socialRecovery.factory)
                    }
                    isSelected={factoryAddresses.has(
                      featureConfig.socialRecovery.factory
                    )}
                    title={'Social Recovery'}
                    description={
                      'Allow your account to be recovered by the people you trust!'
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                width: '100%',
              }}
            >
              <Typography align="left" sx={{ my: 2, fontWeight: 'bold' }}>
                Crowdsource contract wallet (on your own risk)
              </Typography>

              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 1, md: 1 }}
              >
                {data.map((item) => (
                  <Grid key={item.factoryAddress} item xs={12} md={6}>
                    <FeatureCard
                      onClick={() => handleSelectFeature(item.factoryAddress)}
                      isSelected={factoryAddresses.has(item.factoryAddress)}
                      title={item.factoryName}
                      description={item.factoryDescription}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 4 }}
            disabled={factoryAddresses.size < 1}
          >
            Submit
          </Button>
        </>
      )}
    </>
  );
};

export default FeaturePicker;
