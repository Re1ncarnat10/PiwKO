import React, { useEffect, useState } from 'react';
import { deleteCourse } from './api';

const CCardAdmin = ({ courses, setCourses }) => {

    const handleDelete = async (courseId) => {
        try {
            await deleteCourse(courseId);
            // Refresh the courses list after deletion
            const updatedCourses = courses.filter(course => course.courseId !== courseId);
            setCourses(updatedCourses);
        } catch (error) {
            console.error('Error deleting course', error);
        }
    };

    if (!courses) {
        return <div>Loading...</div>;
    }

    if (courses.length === 0) {
        return <div>No matches found for your search.</div>;
    }

    return (
        <>
            {courses.map((course) => (
                <div key={course.courseId}
                     className="card w-96 h-160 overflow-hidden bg-base-200 shadow-2xl  rounded-3xl ms-4 mt-8">
                    <figure><img className="h-80" src={course.image} alt={course.name}/></figure>
                    <div className="card-body h-80">
                        <h2 className="card-title">{course.name}</h2>
                        <p className="card-text">{course.description}</p>
                        <p className="card-text"><strong>Price: </strong>${course.price}</p>
                        <p className="card-text"><strong>Average
                            Rating: </strong>{course.averageRating || 'Not rated yet'}</p>
                        <p className="card-text"><strong>Rating Count: </strong>{course.ratingCount || 0}</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => handleDelete(course.courseId)} className="btn btn-primary">Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CCardAdmin;