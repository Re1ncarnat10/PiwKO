import React, { useEffect, useState } from 'react';
import { fetchFavoriteCourses } from './api';
import FavoriteCard from "./FavoriteCard";

const UserFavoriteCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchFavoriteCourses()
            .then(courses => {
                setCourses(courses);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="home flex flex-col h-256">
            <div className="container-with-course-cards w-full flex flex-wrap justify-start items-center
                align-stretch mb-8 p-8 overflow-y-auto">
                {courses.map((course) => (
                    <FavoriteCard key={course.courseId} course={course} />
                ))}
            </div>
        </div>
    );
};

export default UserFavoriteCourses;