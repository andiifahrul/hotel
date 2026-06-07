import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/Supabase';
import Adminpemesanan from '../componen/componenadmin/adminpemesanan';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/login'); // Lempar ke login jika belum ada session
            } else {
                setIsAuthenticated(true);
            }
            setLoading(false);
        };

        checkUser();
    }, [navigate]);

    if (loading) {
        return <div className="vh-100 d-flex justify-content-center align-items-center"><h4>Memeriksa Akses Keamanan...</h4></div>;
    }

    return isAuthenticated ? <Adminpemesanan /> : null;
};

export default Admin;

//