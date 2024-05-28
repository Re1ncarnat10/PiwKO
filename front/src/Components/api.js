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
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error logging in');
            } else {
                throw new Error(await response.text());
            }
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
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
    const token = localStorage.getItem('token');

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
        return JSON.parse(responseText);
    } catch (error) {
        console.error('Error fetching account details', error);
        throw error;
    }
};
export const checkAdminStatus = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/admin/initialize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            // If the response is not ok (status code is not in the range 200-299), the user is not an admin
            return false;
        }

        // If the response is ok, the user is an admin
        return true;
    } catch (error) {
        throw error;
    }
};
export const addCourses = async (courseData) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/admin/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(courseData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error adding course');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding course', error);
        throw error;
    }
};
export async function fetchCourses() {
    const response = await fetch(`${API_URL}/api/course`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const courses = await response.json();
    return courses;
}

export async function fetchCoursesById(courseId) {
    const response = await fetch(`${API_URL}/api/course/${courseId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const course = await response.json();
    return course;
}