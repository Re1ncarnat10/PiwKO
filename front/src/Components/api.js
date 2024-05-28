const API_URL = 'https://localhost:7067'; // Replace with your server's URL
const token = localStorage.getItem('token');
export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error logging in');
            } else {
                throw new Error(await response.text());
            }
        }

        const data = await response.json();
        localStorage.setItem('token', data.token.result);
        return data;
    } catch (error) {
        console.error('Error logging in', error);
        throw error;
    }
};

export const register = async (Name, Email, Password, ConfirmPassword) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name, Email, Password, ConfirmPassword })
        });

        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                const errorData = await response.json();
                const errorMessage = errorData.errors?.ConfirmPassword[0] || errorData[0]?.description||'Error registering';
                throw new Error(errorMessage);
            } else if (contentType && contentType.indexOf('application/json')) {
                // Handle the case where the content-type is 'application/json' for password
                const errorData = await response.json();
                const errorMessage = errorData.errors?.ConfirmPassword[0] || 'Error registering';
                throw new Error(errorMessage);
            } else {
                throw new Error(await response.text());
            }
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering', error);
        throw error;
    }
};
export const getAccountDetails = async () => {
    try {
        const response = await fetch(`${API_URL}/my-account`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching account details');
        }

        const responseText = await response.text();
        console.log('Response text:', responseText); // Log the raw response text

        return JSON.parse(responseText); // Parse the response text as JSON
    } catch (error) {
        console.error('Error fetching account details', error);
        throw error;
    }
};