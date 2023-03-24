import {
  Button,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

const SignMessage = ({
  onComplete,
}: {
  onComplete: (context: any) => void;
}) => {
  return (
    <>
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
          <Button size="large" variant="contained" onClick={() => onComplete()}>
            Continue
          </Button>
        </Stack>
      </CardActions>
    </>
  );
};

export default SignMessage;
