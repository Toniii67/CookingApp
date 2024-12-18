import React, { createContext, useState, useContext } from 'react';

const CookingContext = createContext();

export function CookingProvider({ children }) {
    const [cookingStatuses, setCookingStatuses] = useState({});

    const updateCookingStatus = (mealId, status) => {
        setCookingStatuses(prev => ({
            ...prev,
            [mealId]: status
        }));
    };

    return (
        <CookingContext.Provider value={{ cookingStatuses, updateCookingStatus }}>
            {children}
        </CookingContext.Provider>
    );
}

export function useCookingStatus() {
    return useContext(CookingContext);
}