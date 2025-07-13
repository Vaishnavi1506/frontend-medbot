import React, { createContext, useContext, useEffect, useState } from 'react';
import { account } from '../appwriteConfig';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await account.get();
                setUser(user);
            } catch {
                setUser(null);
            }
        };
        checkUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
