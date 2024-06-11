import React, { useEffect, useState } from 'react';
import { purchaseCourse } from './api';

const CourseCard = ({ course, setPurchaseError }) => {
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

    const handlePurchase = async () => {
        try {
            const result = await purchaseCourse(course.courseId);
            setIsPurchaseModalOpen(true); // Open the modal when the purchase is successful
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
    const closePurchaseModal = () => {
        setIsPurchaseModalOpen(false);
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
            {isPurchaseModalOpen && (
                <dialog id="purchase_modal" className="modal" open>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Success!</h3>
                        <p className="py-4">Your purchase was successful.</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn" onClick={closePurchaseModal}>Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
};

export default CourseCard;