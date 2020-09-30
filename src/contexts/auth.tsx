import React, { createContext, useState, useEffect, useContext } from 'react';
import * as auth from '../services/auth';
import api from '../services/api';
interface User{
    firstname:string;
    lastname:string;
    foto:string;
}
export interface AuthContextData {
    user: User | null;
    token: string;
    signIn(usernameInput:string, passwordInput:string): Promise<string>;
    signOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
   
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string>('');
    
    useEffect(()=>{

        async function loadStorageData(){ 
            const storagedToken = localStorage.getItem(`@Project:token`);
            const storagedUser = localStorage.getItem(`@Project:user`);

            if(storagedToken && storagedUser){
                setToken(storagedToken);
                setUser(JSON.parse(storagedUser));
            }
        }
        loadStorageData();
    }, []);

    async function signIn(usernameInput:string, passwordInput:string) { //usuário fez login
        const response = await auth.signIn(usernameInput, passwordInput);
        if(response === "preencha todos os campos"){
            console.log("preencha todos os campos");
            return ("preencha todos os campos");
        }
        else if(response === "usuário ou senha errado"){
            console.log("usuário ou senha errado")
            return ("usuário ou senha errado");
        }
        else{
            

            const userResponse = await api.get(`usuarios/?search=${usernameInput}`);

            const user = userResponse.data[0];

            localStorage.setItem(`@Project:token`, response.data.token);
            localStorage.setItem(`@Project:user`,JSON.stringify(user));
            

            setToken(response.data.token);
            setUser({firstname:user.first_name,lastname:user.last_name, foto:user.foto});
            console.log(response);
            console.log("Sucesso ao efetuar login")
            return "";
        }

        
    }
    function signOut(){ 
        localStorage.clear();
        setToken("");
        setUser(null);
    }
  
    return(
    <AuthContext.Provider value={{ token, user, signIn, signOut}}>
        {children}
    </AuthContext.Provider>
);
};

export function useAuth() {
    
    const context = useContext(AuthContext);
    return context;
}