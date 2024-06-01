import React, { useEffect, useState } from 'react';
import { getAccountDetails } from './api';
import { updateAccountDetails } from './api';
const AccountDetails = () => {
    const [accountDetails, setAccountDetails] = useState(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        getAccountDetails()
            .then(data => {
                setAccountDetails(data);
                setNewName(data.name);
                setNewEmail(data.email);
            })
            .catch(error => console.error(error));
    }, []);

    const handleNameChange = async () => {
        try {
            // Send the updated name to the server
            await updateAccountDetails(newName, accountDetails.email, accountDetails.wallet);
            if (window.confirm('Name updated successfully')) {
                setIsEditingName(false);
            }
        } catch (error) {
            if (error.message.includes("Unexpected token 'M'")) {
                if (window.confirm('Name updated successfully')) {
                    setIsEditingName(false);
                }
            } else {
                alert('Invalid credentials');
            }
        }
    };

    const handleEmailChange = async () => {
        try {
            // Send the updated email to the server
            await updateAccountDetails(accountDetails.name, newEmail, accountDetails.wallet);
            if (window.confirm('Email updated successfully')) {
                setIsEditingEmail(false);
            }
        } catch (error) {
            if (error.message.includes("Unexpected token 'M'")) {
                if (window.confirm('Email updated successfully')) {
                    setIsEditingEmail(false);
                }
            } else {
                alert('Invalid credentials');
            }
        }
    };

    if (!accountDetails) {
        return <div>Loading...</div>;
    }
    return (
        <div className="flex justify-center items-center h-256">
        <div className="bg-white overflow-hidden shadow rounded-lg border w-1/3">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Your Account Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    This is your account, to edit click a icon to a corresponding information.
                </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between">
                            {isEditingName ? (
                                <>
                                    <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                                    <button onClick={handleNameChange}>Change</button>
                                </>
                            ) : (
                                accountDetails.name
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                                 onClick={() => setIsEditingName(true)}>
                                <path fill="currentColor"
                                      d="M4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q.925 0 1.825.113t1.8.362l-1.675 1.7q-.5-.075-.975-.125T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8h6v2zm10 1v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925zM12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m0-2q.825 0 1.413-.587T14 8t-.587-1.412T12 6t-1.412.588T10 8t.588 1.413T12 10m0-2"/>
                            </svg>
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between">
                            {isEditingEmail ? (
                                <>
                                    <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                                    <button onClick={handleEmailChange}>Change</button>
                                </>
                            ) : (
                                accountDetails.email
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                                 onClick={() => setIsEditingEmail(true)}>
                                <path fill="currentColor"
                                      d="M4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q.925 0 1.825.113t1.8.362l-1.675 1.7q-.5-.075-.975-.125T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8h6v2zm10 1v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925zM12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m0-2q.825 0 1.413-.587T14 8t-.587-1.412T12 6t-1.412.588T10 8t.588 1.413T12 10m0-2"/>
                            </svg>
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Wallet Balance</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between">
                            ${accountDetails.wallet}
                            <a href="/my-wallet">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5h-8q-1.775 0-2.887 1.113T9 9v6q0 1.775 1.113 2.888T13 19h8q0 .825-.587 1.413T19 21zm8-4q-.825 0-1.412-.587T11 15V9q0-.825.588-1.412T13 7h7q.825 0 1.413.588T22 9v6q0 .825-.587 1.413T20 17zm3-3.5q.65 0 1.075-.425T17.5 12t-.425-1.075T16 10.5t-1.075.425T14.5 12t.425 1.075T16 13.5"/>
                            </svg>
                            </a>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
        </div>
    );
}
export default AccountDetails;