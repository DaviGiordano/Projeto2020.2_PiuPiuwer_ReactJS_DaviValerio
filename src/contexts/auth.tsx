import React, { createContext, useState, useEffect } from 'react';
//adicionar e importar local storage?
import * as auth from '../services/auth';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<object | null>(null);

    useEffect(()=>{
        function loadStorageData(){
            const storagedUser = localStorage.getItem('PiuPiuer:user');
            const storagedToken = localStorage.getItem('PiuPiuer:token');
            if(storagedToken && storagedUser){
                setUser(JSON.parse(storagedUser));

            }
        }
        //local storage funcionando!
        loadStorageData();
    }, []);

    async function signIn() {
        const response = await auth.signIn();
        setUser(response.user);
        localStorage.setItem('PiuPiuer:user', JSON.stringify(response.user));
        localStorage.setItem('PiuPiuer:token', (response.token));
    }
    function signOut(){
        setUser(null);
    }

    return(
    <AuthContext.Provider value={{signed: !!user, user, signIn, signOut}}>
        {children}
    </AuthContext.Provider>
);
};

export default AuthContext;