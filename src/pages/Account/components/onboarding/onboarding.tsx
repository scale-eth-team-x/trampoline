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
import FeaturePicker from '../../../App/pages/onboarding/components/feature-picker';

const Onboarding: OnboardingComponent = ({
  onOnboardingComplete,
}: OnboardingComponentProps) => {
  return (
    <Box sx={{ padding: 2 }}>
      <CardContent>
        {/* Note: to add onsubmit later */}
        <FeaturePicker onSubmit={() => onOnboardingComplete()} />
      </CardContent>
    </Box>
  );
};

export default Onboarding;
