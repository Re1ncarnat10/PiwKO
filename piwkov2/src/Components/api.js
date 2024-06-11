const API_URL = 'https://localhost:44350'; // Replace with your server's URL
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
            if (response.status !== 403) {
                throw new Error('Error checking admin status');
            }
            return false;
        }

        return true;
    } catch (error) {
        // Do nothing with the error
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
export const deleteCourse = async (courseId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/admin/courses/${courseId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Error deleting course');
        }

        const text = await response.text();
        return text ? JSON.parse(text) : {};
    } catch (error) {
        console.error('Error deleting course', error);
        throw error;
    }
};

export const updateAccountDetails = async (name, email, wallet) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/my-account/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, email, wallet })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error updating account details');
        }

        const responseText = await response.text();
        return responseText.includes("Member info updated") ? { message: "Member info updated" } : JSON.parse(responseText);
    } catch (error) {
        console.error('Error updating account details', error);
        throw error;
    }
};
export const addWalletAmount = async (amount) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/my-account/wallet/add?amount=${amount}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error adding amount to wallet');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return await response.json();
        } else {
            return { message: await response.text() };
        }
    } catch (error) {
        console.error('Error adding amount to wallet', error);
        throw error;
    }
};
export const purchaseCourse = async (courseId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/UserCourse/purchase/${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                const errorData = await response.json();
                if (errorData.message.includes('Insufficient funds')) {
                    throw new Error('Insufficient funds');
                } else if (errorData.message.includes('already purchased')) {
                    throw new Error('You have already purchased this course');
                } else {
                    throw new Error(errorData.message || 'Error purchasing course');
                }
            } else {
                throw new Error(await response.text());
            }
        }

        const responseText = await response.text();
        return responseText.includes("Course purchased") ? { message: "Course purchased" } : JSON.parse(responseText);
    } catch (error) {
        console.error('Error purchasing course', error);
        throw error;
    }
};
export const fetchBoughtCourses = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/Course/bought`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching bought courses');
        }

        const courses = await response.json();
        return courses;
    } catch (error) {
        console.error('Error fetching bought courses', error);
        throw error;
    }
};
export const rateCourse = async (courseId, rating) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/UserCourse/rate/${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: rating
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error rating course');
        }

        const course = await response.json();
        return course;
    } catch (error) {
        console.error('Error rating course', error);
        throw error;
    }
};
export const addToFavourites = async (courseId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/UserCourse/favourites/${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error adding to favourites');
        }

        const course = await response.json();
        return course;
    } catch (error) {
        console.error('Error adding to favourites', error);
        throw error;
    }
};
export const fetchFavoriteCourses = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/api/Course/favorites`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching favorite courses');
        }

        const courses = await response.json();
        return courses;
    } catch (error) {
        console.error('Error fetching favorite courses', error);
        throw error;
    }
};