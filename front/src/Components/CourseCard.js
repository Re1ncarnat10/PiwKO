import React, {  useState, useEffect } from 'react';
import { fetchCourses } from './api';

const CourseCard = ({ courseId }) => { // Add courseId prop
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourses = async () => {
            const fetchedCourses = await fetchCourses();
            setCourses(fetchedCourses);
        };

        getCourses();
    }, []);

    return (
        <div className="row">
            {courses.filter(course => course.courseId === courseId).map((course) => ( // Use courseId prop here
                <div className="col-sm-4" key={course.courseId}>
                    <div className="card">
                        <img src={course.image} className="card-img-top" alt={course.name} />
                        <div className="card-body">
                            <h5 className="card-title">{course.name}</h5>
                            <p className="card-text">{course.description}</p>
                            <p className="card-text"><strong>Price: </strong>${course.price}</p>
                            <p className="card-text"><strong>Average Rating: </strong>{course.averageRating || 'Not rated yet'}</p>
                            <p className="card-text"><strong>Rating Count: </strong>{course.ratingCount || 0}</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseCard;