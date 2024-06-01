import React from 'react';
import { useNavigate } from 'react-router-dom';
const FavoriteCard = ({ course }) => {
    const navigate = useNavigate();
    const handleShowContent = () => {
        navigate(`/course-content/${course.courseId}`);
    };






    return (
        <div key={course.courseId} className="card w-96 h-160 overflow-hidden bg-base-200 shadow-2xl  rounded-3xl ms-4 mt-8">
            <figure><img className="h-80" src={course.image} alt={course.name}/></figure>
            <div className="card-body h-80">
                <h2 className="card-title">{course.name}</h2>
                <p className="card-text">{course.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={handleShowContent}>Show content
                    </button>

                </div>
            </div>
        </div>
    );
};

export default FavoriteCard;