import React, { useState } from 'react';
import { addCourses } from './api';

const Admin = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [content, setContent] = useState('');

    const placeholderImage = 'https://via.placeholder.com/150'; // Placeholder image URL

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(placeholderImage);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const courseData = {
            name,
            description,
            image: image || placeholderImage, // Use the selected image or the placeholder image
            price,
            content
        };

        try {
            const response = await addCourses(courseData);
            console.log(response);
        } catch (error) {
            console.error('Error adding course', error);
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <label>
                    Image:
                    <input type="file" onChange={handleImageChange} />
                </label>
                <label>
                    Price:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </label>
                <label>
                    Content:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </label>
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default Admin;