import { useState } from "react";

export default function useNotificationsData() {
    // indice de la dernière notification
    const [lastNotificationId, setLastNotificationId] = useState(0);
    // tableau des notifications
    const [notificationsData, setNotificationsData] = useState([]);

    const addNotification = (notification) => {
        setLastNotificationId(lastNotificationId + 1);
        // id => lettre
        const res = String.fromCharCode(65 + lastNotificationId);
        notification.title = `Notification ${res}`;
        notification.content = "Content";
        setNotificationsData([...notificationsData, notification]);
    }

    const deleteNotification = (id) => {
        setNotificationsData(notificationsData.filter((notification) => notification.id !== id));
    }

    return {
        notificationsData,
        addNotification,
        deleteNotification,
    }
}
