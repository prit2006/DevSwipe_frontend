import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { setNotifications, markAsRead, markAllAsRead } from "../utils/notificationSlice";

const NotificationsDropdown = ({ onClose }) => {
    const dispatch = useDispatch();
    const notifications = useSelector((store) => store.notification?.items || []);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // We already fetch initial notifications in NavBar
        // However, we can fetch again here to get the most updated ones when opened
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/notification`, { withCredentials: true });
                dispatch(setNotifications(res.data));
            } catch (err) {
                console.error("Failed to fetch notifications", err);
            }
        };
        fetchNotifications();

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch, onClose]);

    const handleMarkAsRead = async (id, e) => {
        e.stopPropagation();
        try {
            await axios.patch(`${BASE_URL}/notification/${id}/read`, {}, { withCredentials: true });
            dispatch(markAsRead(id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await axios.patch(`${BASE_URL}/notification/mark-all-read`, {}, { withCredentials: true });
            dispatch(markAllAsRead());
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div ref={dropdownRef} className="absolute right-0 mt-3 w-80 sm:w-96 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col max-h-[80vh]">
            <div className="px-4 py-3 border-b border-gray-700 flex justify-between items-center bg-gray-800">
                <h3 className="text-white font-semibold">Notifications</h3>
                <button onClick={handleMarkAllAsRead} className="text-xs text-blue-400 hover:text-blue-300 font-medium transition">
                    Mark all as read
                </button>
            </div>
            <div className="overflow-y-auto flex-1 p-2 flex flex-col gap-2 relative">
                {notifications.length === 0 ? (
                    <div className="py-8 text-center text-gray-500 flex flex-col items-center">
                        <svg className="w-12 h-12 mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        <p>You have no notifications</p>
                    </div>
                ) : (
                    notifications.map((notif) => (
                        <div
                            key={notif._id}
                            className={`p-3 rounded-lg transition-colors flex gap-3 items-start ${notif.isRead ? "bg-transparent hover:bg-gray-800/50" : "bg-gray-800 hover:bg-gray-700 shadow-sm"
                                }`}
                        >
                            <img
                                src={notif.senderId?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                                alt="avatar"
                                className="w-10 h-10 rounded-full object-cover border border-gray-700 mt-1"
                            />
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm tracking-tight leading-snug ${notif.isRead ? "text-gray-400" : "text-gray-100 font-medium"}`}>
                                    {notif.message}
                                </p>
                                <div className="mt-1 flex items-center justify-between">
                                    <p className="text-[11px] text-gray-500">
                                        {new Date(notif.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                    </p>
                                    {!notif.isRead && (
                                        <button
                                            onClick={(e) => handleMarkAsRead(notif._id, e)}
                                            className="text-[10px] text-blue-400 hover:text-blue-300 px-2 py-0.5 rounded-full hover:bg-gray-700/50 transition-colors"
                                        >
                                            Mark Read
                                        </button>
                                    )}
                                </div>
                            </div>
                            {!notif.isRead && <div className="w-2 h-2 shrink-0 rounded-full bg-blue-500 mt-2"></div>}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationsDropdown;
