import { Box, Button, Divider, Tab, Tabs, TextField, Typography } from '@mui/material';
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
  const [spendingLimit, setSpendingLimit] = useState<number>(0);
  const [activateSpendingLimit, setActivateSpendingLimit] = useState<boolean>(false);
  const [guardian, setGuardian] = useState<string | undefined>('');

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  // useEffect(() => {
  const { data, isError, isLoading } = useContractRead({
    address: address,
    abi: ContractABI,
    functionName: 'getLimit',
  })
  const { data: guardianAddress } = useContractRead({
    address: address,
    abi: ContractABI,
    functionName: 'guardian',
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
    await contract?.enableSpendLimit();
    await setActivateSpendingLimit(true)
  }
  const callSetSpendingLimit = async (limit: number) => {
    const spendingLimitData = await contract?.setSpendingLimit(limit);
    console.log("limit: ", limit);
    console.log("callSetSpendingLimitData: ", spendingLimitData);
  }
  const callSetGuardian = async () => {
    return await contract?.setGuardian(guardian);
  }
  const callSetupRecovery = async () => {
    await contract?.initRecovery(address);
    console.log("end init")
    setTimeout(() => { }, 3600);
    const recoveryRequestData = await contract?.recoveryRequest();
    const newOwnerAddr = recoveryRequestData[0];
    const requestedAt = Number(recoveryRequestData[1]);
    const nonce = await contract?.recoveryNonce();

    const recoveryHash = ethers.utils.solidityKeccak256(
      ['address', 'uint256', 'uint256'],
      [newOwnerAddr, requestedAt, Number(nonce)]
    );

    let signature = await signer.signMessage(ethers.utils.arrayify(recoveryHash))
    await contract?.executeRecovery(signature);
    // await contract?.executeRecovery();
    console.log("execute recovery")
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
            <>
              {
                data && (
                  <Box sx={{ my: 3, mx: 2 }}>
                    <Typography variant="h5" gutterBottom>
                      Daily Spending Limit
                    </Typography>
                    <Box>
                      {
                        activateSpendingLimit ? (
                          <>
                            <TextField
                              id="spending limit"
                              type="number"
                              defaultValue={spendingLimit}
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setSpendingLimit(event.target.value);
                              }}
                            />
                            <Button variant="contained" onClick={async () => await callSetSpendingLimit(spendingLimit)}>Set Spending Limit</Button>
                            Data: {data.toString()}
                            {/* <Typography component={'span'}> spendingLimit: {data} </Typography> */}
                          </>
                        ) : (
                          <>
                            <Button variant="contained" onClick={async () => await enableSpendingLimit()}>Activate Spending Limit</Button>
                          </>
                        )
                      }
                    </Box>
                  </Box>
                )
              }

              <Divider variant="middle" />
              {
                guardianAddress && (
                  <Box sx={{ my: 3, mx: 2 }}>
                    <Typography variant="h5" gutterBottom>
                      Social Recovery
                    </Typography>
                    <TextField
                      id="guardian"
                      label="Required"
                      defaultValue={guardianAddress}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setGuardian(event.target.value);
                      }}
                    />
                    <Button variant="contained" onClick={async () => await callSetGuardian()}>Set Guardian</Button>
                    <Typography variant="h5" gutterBottom>
                      Recover Accounts
                    </Typography>
                    <Button variant="contained" onClick={async () => await callSetupRecovery()}>Perform Recovery</Button>
                  </Box>
                )
              }
            </>
          </TabPanel>
        </Box>
      </TabContext>
    </>
  );
};

export default AccountActivity;
