import React, { useEffect, useState } from 'react';
import UserCourseCard from './UserCourseCard';
import { fetchBoughtCourses } from './api';

const UserCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchBoughtCourses()
            .then(courses => {
                setCourses(courses);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="home flex flex-col   h-256">
            <div className="container-with-course-cards w-full flex flex-wrap justify-start items-center
                align-stretch  mb-8 p-8  overflow-y-auto  ">
                {courses.map((course) => (
                    <UserCourseCard key={course.courseId} course={course} />
                ))}
            </div>
        </div>
    );
};

export default UserCourses;