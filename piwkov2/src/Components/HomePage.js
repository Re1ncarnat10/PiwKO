import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CourseCard from './CourseCard';
import {fetchCourses} from "./api";

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the location
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;
    const loginSuccess = location.state?.loginSuccess;
    const [selectedFilter, setSelectedFilter] = useState('name');
    const [purchaseError, setPurchaseError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Add this line

    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('name');
    const [courses, setCourses] = useState([]); // Add this line
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [isPriceFilter, setIsPriceFilter] = useState(false);

    useEffect(() => {
        if (loginSuccess && sessionStorage.getItem('alertShown') === 'false') {
            setIsModalOpen(true); // Open the modal when the user logs in
            sessionStorage.setItem('alertShown', 'true');

            // Close the modal after 3 seconds
            setTimeout(() => {
                setIsModalOpen(false);
            }, 3000);
        }
    }, [loginSuccess]);
    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };
    useEffect(() => {
        fetchCourses()
            .then(courses => {
                setCourses(courses);
                setFilteredCourses(courses);
            })
            .catch(error => console.error(error));
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
        setFilter(event.target.value);
        setIsPriceFilter(event.target.value === 'price');
    };

    const handleSearch = () => {
        let result = courses;

        if (searchTerm !== '') {
            result = result.filter(course => course[filter].toLowerCase().includes(searchTerm.toLowerCase()));
        }

        result = result.filter(course => course.price >= minPrice && course.price <= maxPrice);

        setFilteredCourses(result);
    };

    return (
        <>
            {!isLoggedIn && (
                <div className="hero h-256 bg-base-200">
                    <div className="hero-content text-center rounded-lg bg-white p-10 border-2 border-gray-300">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Hello there</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                                exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <button className="btn rounded-2xl btn-default" onClick={() => navigate('/login')}>Login
                            </button>
                            <button className="btn rounded-2xl btn-default" onClick={() => navigate('/register')}>Register
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isLoggedIn && (
                <div className="home flex flex-col items-center justify-center  h-256">

                    {purchaseError && (
                        <div role="alert" className="alert alert-error mt-16 max-w-96">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Error! {purchaseError}</span>
                        </div>
                    )}

                    <div className="search-container flex flex-col items-center w-full h-256 ">
                        {isModalOpen && (
                            <dialog id="my_modal_1" className="modal" open>
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Hello!</h3>
                                    <p className="py-4">Login successful. Welcome!</p>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn" onClick={closeModal}>Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        )}
                        <div className="join mt-8 w-5/6">
                            <div className="w-full">
                            <div>

                                {isPriceFilter && (
                                    <div>
                                        <input type="number" className="input input-bordered join-item w-1/2" placeholder="Min Price"
                                               onChange={event => setMinPrice(event.target.value)}/>
                                        <input type="number" className="input input-bordered join-item w-1/2" placeholder="Max Price"
                                               onChange={event => setMaxPrice(event.target.value)}/>
                                    </div>
                                )}
                                {!isPriceFilter && (
                                    <input className="input input-bordered join-item w-full" placeholder="Search"
                                           onChange={handleSearchChange}/>
                                )}
                            </div>
                        </div>
                            <select className="select select-bordered join-item" value={selectedFilter}
                                    onChange={handleFilterChange}>
                                <option value="name">Name</option>
                                <option value="price">Price</option>
                                <option value="description">Description</option>
                            </select>
                            <div className="indicator">
                                <button className="btn join-item select-bordered " onClick={handleSearch}>Search
                                </button>
                            </div>
                        </div>
                        <div className="container-with-course-cards w-5/6 flex flex-wrap justify-center  items-start auto-gutter
                    align-stretch  mb-8 p-8 border-2 border-gray-300 rounded-s overflow-y-auto  ">

                            {filteredCourses.map((course) => (
                                <CourseCard key={course.courseId} course={course} theme="dark" setPurchaseError={setPurchaseError} />                            ))}
                    </div>
                    </div>
                </div>
            )}

        </>
    );
};
export default Home;
