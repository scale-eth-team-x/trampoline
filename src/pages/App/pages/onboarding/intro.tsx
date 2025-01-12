import React from 'react';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import logo from '../../../../assets/img/walletx-logo.png';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const navigate = useNavigate();

  return (
    <Stack
      spacing={2}
      sx={{ height: '100%' }}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="span"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: 600,
          p: 2,
          border: '1px solid #d6d9dc',
          borderRadius: 5,
          background: 'white',
        }}
      >
        <CardContent>
          <Typography textAlign="center" variant="h3" gutterBottom>
            WalletX
          </Typography>
          <Typography textAlign="center" variant="body1" color="text.secondary">
            Your modularized smart contract account with unlimited
            possibilities, <Link>learn more</Link>
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ p: 5 }}
          >
            <img
              height={250}
              src={logo}
              className="App-logo"
              alt="logo"
              style={{ borderRadius: '32px' }}
            />
          </Box>
        </CardContent>
        <CardActions sx={{ pl: 4, pr: 4, width: '100%' }}>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Button
              size="large"
              variant="contained"
              onClick={() => navigate('/accounts/new')}
            >
              Create new account
            </Button>
          </Stack>
        </CardActions>
      </Box>
    </Stack>
  );
};

export default Intro;
