import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCoursesById } from './api';

const CourseContent = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        fetchCoursesById(courseId)
            .then(course => {
                setCourse(course);
            })
            .catch(error => console.error(error));
    }, [courseId]);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
    <div className="flex flex-col justify-center items-center h-256">
        <div className="bg-white overflow-hidden shadow rounded-lg border mt-12">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {course.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {course.description}
                </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Content</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {course.content}
                        </dd>
                    </div>


                </dl>
            </div>
        </div>
    </div>
)
    ;
};

export default CourseContent;