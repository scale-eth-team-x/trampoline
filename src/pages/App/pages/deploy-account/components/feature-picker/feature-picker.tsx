import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { FeaturePickerProps } from './feature-picker.types';
import FeatureCard from './components/feature-card';

const FeaturePicker = ({ onClose, onSubmit }: FeaturePickerProps) => {
  return (
    <Dialog
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '500px', // Set your width here
            height: '100%',
          },
        },
      }}
      open={true}
      onClose={onClose}
    >
      <DialogTitle>Select features</DialogTitle>
      <DialogContent>
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
            columnSpacing={{ xs: 1, sm: 2, md: 1 }}
          >
            <Grid item xs={12} md={6}>
              <FeatureCard
                onClick={() => {}}
                title="hello"
                description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, earum est ab quo ipsam itaque quos facere harum reprehenderit provident?"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FeatureCard
                onClick={() => {}}
                title="hello"
                description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, earum est ab quo ipsam itaque quos facere harum reprehenderit provident?"
                isSelected
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FeatureCard
                onClick={() => {}}
                title="hello"
                description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, earum est ab quo ipsam itaque quos facere harum reprehenderit provident?"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button fullWidth onClick={onClose}>
          Cancel
        </Button>
        <Button fullWidth variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeaturePicker;
