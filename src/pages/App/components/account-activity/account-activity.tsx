import { Box, Button, Tab, Tabs, TextField, Typography } from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import { getActiveAccount } from '../../../../pages/Background/redux-slices/selectors/accountSelectors';
import { useBackgroundSelector } from '../../hooks';
import { useContract, useContractRead, useSigner } from 'wagmi'
import ContractABI from '../../../../contract/SpdLmtSoRcvryABI.json'
import { ethers } from 'ethers';


const AccountActivity = ({ address }: { address: string }) => {
  const [activeTab, setActiveTab] = useState<
    'assets' | 'activity' | 'settings'
  >('assets');
  const [spendingLimit, setSpendingLimit] = useState<number | undefined>(undefined);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  // useEffect(() => {
  const { data, isError, isLoading } = useContractRead({
    address: address,
    abi: ContractABI,
    functionName: 'getLimit',
  })
  const contract = useContract({
    address: address,
    abi: ContractABI,
    signerOrProvider: signer
  })

  useEffect(() => {
    if (data != undefined) {
      console.log("data: ", data.toString());
      setSpendingLimit(data.toNumber())
    }
  }, [])
  // }, [address])

  const enableSpendingLimit = async () => {

    return await contract?.enableSpendLimit();
  }
  const callSetSpendingLimit = async (limit: number) => {
    const data = await contract?.setSpendingLimit(limit);
    console.log("callSetSpendingLimitData: ", data);
    setSpendingLimit(limit);
    return data
  }

  return (
    <>
      <TabContext value={activeTab}>
        <Box>
          <Tabs
            variant="fullWidth"
            onChange={(e, newTab) => setActiveTab(newTab)}
            value={activeTab}
            sx={{
              borderBottom: '1px solid rgb(0, 0, 0, 0.2)',
            }}
          >
            <Tab label="Assets" value="assets" />
            <Tab label="Activity" value="activity" />
            <Tab label="Settings" value="settings" />
          </Tabs>
          <TabPanel value="assets">assets</TabPanel>
          <TabPanel value="activity">activity</TabPanel>
          <TabPanel value="settings">
            <Typography variant="h5" gutterBottom>
              Daily Spending Limit
            </Typography>
            {
              spendingLimit ? (
                <>
                  <TextField
                    required
                    id="spending limit"
                    type="number"
                    value={spendingLimit}
                    defaultValue="Hello World"
                  />
                  <Button variant="contained">Update</Button></>
              ) : (
                <>
                  <Button variant="contained" onClick={async () => await enableSpendingLimit()}>Activate Spending Limit</Button>
                </>
              )
            }
            <>
              <Button variant="contained" onClick={async () => await callSetSpendingLimit(1)}>Set Spending Limit</Button>
            </>
            <Typography variant="h5" gutterBottom>
              Social Recovery
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
            />
          </TabPanel>
        </Box>
      </TabContext>
    </>
  );
};

export default AccountActivity;
