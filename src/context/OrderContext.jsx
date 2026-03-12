import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem("craftoverse-orders");
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    useEffect(() => {
        localStorage.setItem("craftoverse-orders", JSON.stringify(orders));
    }, [orders]);

    const addOrder = (orderData) => {
        const newOrder = {
            id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            ...orderData,
            status: "pending", // Default status is always pending
            createdAt: new Date().toISOString()
        };
        setOrders((prev) => [newOrder, ...prev]);
    };

    const markOrderCompleted = (orderId) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId ? { ...order, status: "completed" } : order
            )
        );
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, markOrderCompleted }}>
            {children}
        </OrderContext.Provider>
    );
};
