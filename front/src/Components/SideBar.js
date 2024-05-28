import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaWallet, FaBook, FaStar, FaCaretDown, FaBars } from 'react-icons/fa';

export const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Add this line

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelectChange = (option, path) => {
        navigate(path);
        setIsOpen(false); // Close the dropdown menu
    };

    return (
        <div className="sort-bar" ref={dropdownRef}> {/* Add ref here */}
            <div className="dropdown menu-flex" onClick={() => setIsOpen(!isOpen)}>
                <FaBars size="1rem" className="layout-icon"/> <FaCaretDown /> {/* Always render the FaBars icon */}
                {isOpen && (
                    <div className="dropdown-content">
                        <div onClick={() => handleSelectChange('My Account', '/my-account')}><FaUser /> My Account</div>
                        <div onClick={() => handleSelectChange('My Wallet', '/my-wallet')}><FaWallet /> My Wallet</div>
                        <div onClick={() => handleSelectChange('My Courses', '/my-courses')}><FaBook /> My Courses</div>
                        <div onClick={() => handleSelectChange('Favorites', '/favorites')}><FaStar /> Favorites</div>
                    </div>
                )}
            </div>
        </div>
    );
};