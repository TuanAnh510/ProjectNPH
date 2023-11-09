// CartContext.js
import React, { createContext, useState } from 'react';

const CartRentContext = createContext();

const CartRentProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPriceRentMonth, setTotalPriceRentMonth] = useState("");
    const [selectedRegionId, setSelectedRegionId] = useState("")
    const [totalPriceRent, setTotalPriceRent] = useState("");
    const [totalPriceDateRent, setTotalPriceDateRent] = useState(0);
    const [totalItemRent, setTotalItemRent] = useState(0);

    const value = {
        setTotalPriceDateRent,
        totalPriceDateRent,
        cartItems,
        setCartItems,
        setTotalPriceRent,
        totalPriceRent,
        setTotalItemRent,
        totalItemRent,
        setTotalPriceRentMonth,
        totalPriceRentMonth,
        setSelectedRegionId,
        selectedRegionId
    };

    return (
        <CartRentContext.Provider value={value}>
            {children}
        </CartRentContext.Provider>
    );
};

export { CartRentContext, CartRentProvider };
