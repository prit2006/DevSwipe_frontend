import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/const";
import { addUser } from "../utils/userSlice";

const JobLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/profile`, {
                withCredentials: true,
            });
            dispatch(addUser(res.data));
        } catch (err) {
            if (err.response?.status === 401) {
                navigate("/login");
            }
            console.error(err);
        }
    };

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [user]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
            <NavBar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default JobLayout;
