import React, { useState } from 'react';
import Navbar from '../themes/Navbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Users from './users.js';
import Products from './products.js';
import Roles from './roles.js';


const Dashboard = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Navbar />
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: 300, marginTop: '2%' }}>
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                    >
                        <Tab label="Users" />
                        <Tab label="Roles Category" />
                        <Tab label="Product Category" />
                    </Tabs>
                </Box>
                <Box sx={{ flexGrow: 1, marginTop: '2%', padding: '1%', paddingLeft: '4%' }}>
                    {value === 0 && <Users />}
                    {value === 1 && <Roles />}
                    {value === 2 && <Products />}
                </Box>
            </Box>
        </div>
    )
}

export default Dashboard