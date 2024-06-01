import React from 'react';
import { useNavigate} from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();


    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="p-4">Admin Dashboard</h1>
            <button onClick={() => navigate('/admin/create')} className="btn rounded-2xl btn-neutral m-4">
                Create Course
            </button>
            <button onClick={() => navigate('/admin/delete')} className="btn rounded-2xl btn-error m-4">
                Delete Course
            </button>
        </div>
    );
};

export default Admin;