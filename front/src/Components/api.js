const API_URL = 'https://localhost:7067'; // Replace with your server's URL

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
            try {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error logging in');
            } catch (jsonError) {
                throw new Error(await response.text());
            }
        }

        const data = await response.json(); // Store the response in a variable
        localStorage.setItem('token', data.token.result);
        return data; // Return the stored response
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
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error registering');
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering', error);
        throw error;
    }
};
// Add more API calls as needed