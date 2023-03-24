import { Box, Tab, Tabs } from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import React, { useState } from 'react';

const AccountActivity = () => {
  const [activeTab, setActiveTab] = useState<'assets' | 'activity'>('assets');

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
            settings (show all the custom features here)
          </TabPanel>
        </Box>
      </TabContext>
    </>
  );
};

export default AccountActivity;
