import React, {useEffect, useState} from 'react';
import {getAccountDetails, addWalletAmount} from "./api";

const MyWallet = () => {
    const [amount, setAmount] = useState(0);
    const [accountDetails, setAccountDetails] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    useEffect(() => {
        getAccountDetails()
            .then(data => {
                setAccountDetails(data);
            })
            .catch(error => console.error(error));
    }, []);
    const handleWalletUpdate = async (e) => {
        e.preventDefault();
        try {
            await addWalletAmount(amount);
            const updatedAccountDetails = await getAccountDetails();
            setAccountDetails(updatedAccountDetails);
            setSuccessMessage(`Successfully added ${amount} to your wallet.`);
        } catch (error) {
            console.error('Error updating wallet', error);
        }
    };
    return (
        <div className="flex flex-col justify-center items-center h-256">
            {successMessage && (
                <div role="alert" className="alert alert-success mt-4  w-96 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{successMessage}</span>
                </div>
            )}
        <div className="bg-white overflow-hidden shadow rounded-lg border mt-12">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Your Wallet
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">

                </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Balance</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            ${accountDetails?.wallet}
                        </dd>
                    </div>

                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex flex-col items-center">
                        <dt className="text-sm font-medium text-gray-500">Update wallet</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <form onSubmit={handleWalletUpdate}>
                                <input placeholder="Add amount" className="input input-bordered w-full max-w-xs"
                                    type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                                       required/>
                                <button type="submit">Update Wallet</button>
                            </form>

                        </dd>
                    </div>
                </dl>
            </div>
        </div>
        </div>

    )
}
export default MyWallet;