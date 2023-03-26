import { Box, CardContent } from '@mui/material';
import React from 'react';
import { OnboardingComponent, OnboardingComponentProps } from '../types';
import FeaturePicker from '../../../App/pages/onboarding/components/feature-picker';

const Onboarding: OnboardingComponent = ({
  onOnboardingComplete,
}: OnboardingComponentProps) => {
  const handleOnboardingComplete = (factoryAddress: string) => {
    console.log({ factoryAddress });
    onOnboardingComplete({ factoryAddress });
  };

  return (
    <Box sx={{ padding: 2, overflowY: 'scroll' }}>
      <CardContent>
        {/* Note: to add onsubmit later */}
        <FeaturePicker onSubmit={handleOnboardingComplete} />
      </CardContent>
    </Box>
  );
};

export default Onboarding;
