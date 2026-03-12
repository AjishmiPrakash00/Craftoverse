import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
    const { user } = useAuth();

    // Instead of unconditionally reading "cart", we wait for the user state
    const [cartItems, setCartItems] = useState([]);

    // Load cart whenever the user changes
    useEffect(() => {
        if (user) {
            // Logged in: load their personal cart
            const savedCart = localStorage.getItem(`cart_${user.id}`);
            setCartItems(savedCart ? JSON.parse(savedCart) : []);
        } else {
            // Logged out: start with an empty cart
            setCartItems([]);
        }
    }, [user]);

    // Save cart whenever cartItems changes, IF a user is logged in
    useEffect(() => {
        if (user) {
            localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
        }
    }, [cartItems, user]);

    const addToCart = (product, size, quantity) => {
        // Only allow adding to cart if logged in (or we can allow local guest carts, but the prompt says empty cart when entered, restored when logged in)
        if (!user) {
            // You might want to trigger a login redirect here or just alert them
            alert("Please log in to add items to your cart.");
            return;
        }

        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (item) => item.id === product.id && item.size === size
            );

            if (existingItemIndex >= 0) {
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            } else {
                const cartItemId = `${product.id}-${size}`;
                return [
                    ...prevItems,
                    {
                        cartItemId,
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        size,
                        quantity,
                    },
                ];
            }
        });
    };

    const removeFromCart = (cartItemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
    };

    const updateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
