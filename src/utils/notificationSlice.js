import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        items: [],
        unreadCount: 0,
    },
    reducers: {
        setNotifications: (state, action) => {
            state.items = action.payload;
            state.unreadCount = action.payload.filter((n) => !n.isRead).length;
        },
        markAsRead: (state, action) => {
            const notificationId = action.payload;
            const notification = state.items.find((n) => n._id === notificationId);
            if (notification && !notification.isRead) {
                notification.isRead = true;
                state.unreadCount -= 1;
            }
        },
        markAllAsRead: (state) => {
            state.items.forEach((n) => {
                n.isRead = true;
            });
            state.unreadCount = 0;
        },
        addNotification: (state, action) => {
            state.items.unshift(action.payload);
            state.unreadCount += 1;
        },
        removeNotification: (state, action) => {
            const idToRemove = action.payload;
            const notification = state.items.find((n) => n._id === idToRemove);
            if (notification) {
                if (!notification.isRead) {
                    state.unreadCount -= 1;
                }
                state.items = state.items.filter((n) => n._id !== idToRemove);
            }
        },
    },
});

export const {
    setNotifications,
    markAsRead,
    markAllAsRead,
    addNotification,
    removeNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
