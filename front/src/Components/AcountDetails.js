import React, { useEffect, useState } from 'react';
import { getAccountDetails } from './api';

const AccountDetails = () => {
    const [accountDetails, setAccountDetails] = useState(null);

    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                const details = await getAccountDetails();
                setAccountDetails(details);
            } catch (error) {
                console.error('Error fetching account details', error);
            }
        };

        fetchAccountDetails();
    }, []);

    if (!accountDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Account Details</h1>
            <p>Name: {accountDetails.name}</p>
            <p>Email: {accountDetails.email}</p>
        </div>
    );
};

export default AccountDetails;