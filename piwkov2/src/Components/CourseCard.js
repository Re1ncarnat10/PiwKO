import React, { useEffect, useState } from 'react';
import { purchaseCourse } from './api';

const CourseCard = ({ course, setPurchaseError }) => {
    const handlePurchase = async () => {
        try {
            const result = await purchaseCourse(course.courseId);
            console.log(result); // Log the result for now, you can handle it as per your requirement
        } catch (error) {
            console.error('Error purchasing course', error);
            if (error.message.includes('Insufficient funds')) {
                setPurchaseError('Insufficient funds');
            } else if (error.message.includes('Course already purchased')) {
                setPurchaseError('Course already purchased');
            } else {
                setPurchaseError(error.message);
            }
        }
    };

    if (!course) {
        return <div>Loading...</div>;
    }

    if (course.length === 0) {
        return <div>No matches found for your search.</div>;
    }

    return (
        <>
                <div key={course.courseId} className="card w-96 h-160 overflow-hidden bg-base-200 shadow-2xl  rounded-3xl ms-4 mt-8">
                    <figure><img className="h-80" src={course.image} alt={course.name}/></figure>
                    <div className="card-body h-80">
                        <h2 className="card-title">{course.name}</h2>
                        <p className="card-text">{course.description}</p>
                        <p className="card-text"><strong>Price: </strong>${course.price}</p>
                        <p className="card-text"><strong>Average
                            Rating: </strong>{course.averageRating || 'Not rated yet'}</p>
                        <p className="card-text"><strong>Rating Count: </strong>{course.ratingCount || 0}</p>
                        <div className="card-actions justify-end">

                            <button className="btn btn-primary" onClick={handlePurchase}>Buy Now for
                                ${course.price}</button>
                        </div>
                    </div>
                </div>
        </>
    );
};

export default CourseCard;