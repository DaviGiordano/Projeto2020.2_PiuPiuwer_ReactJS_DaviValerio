import React, { createContext, useState, useEffect, useContext } from 'react';
//adicionar e importar local storage? não precisa
import * as auth from '../services/auth';
import api from '../services/api';

interface User{
    email: string;
    name: string;
}
interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        function loadStorageData(){ //usuario deu reload na pagina
            const storagedUser = localStorage.getItem('PiuPiuer:user');
            const storagedToken = localStorage.getItem('PiuPiuer:token');
            
            api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
            // O QUE USAR AQUI EM VEZ DE HEADER? api.defaults.header['Authorization'] = `Bearer ${storagedToken}`;

            if(storagedToken && storagedUser){
                setUser(JSON.parse(storagedUser));
                setLoading(false);
            }
        }
        //local storage funcionando!
        loadStorageData();
    }, []);

    async function signIn() { //usuário fez login
        const response = await auth.signIn();
        setUser(response.user);

        api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

        localStorage.setItem('PiuPiuer:user', JSON.stringify(response.user));
        localStorage.setItem('PiuPiuer:token', (response.token));
    }
    function signOut(){
        localStorage.clear();
        setUser(null);
    }

    return(
    <AuthContext.Provider value={{signed: !!user, user, signIn,loading, signOut}}>
        {children}
    </AuthContext.Provider>
);
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}