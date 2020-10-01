import React, { createContext, useState, useEffect, useContext } from 'react';
import * as auth from '../services/auth';
import api from '../services/api';
interface User{
    firstname: string;
    id: number;
    lastname: string;
    foto: string;
}
export interface UserApi{
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    sobre: string;
    foto: string;
}
export interface PiuData{
    id: number;
    usuario: UserApi;
    likers: Array<UserApi>;
    favoritado_por: Array<UserApi>;
    texto: string;
    horario: string;
}
export interface AuthContextData {
    user: User;
    token: string;
    signIn(usernameInput:string, passwordInput:string): Promise<string>;
    signOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
   
    const [user, setUser] = useState<User>({} as User);
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
            console.log("usuário ou senha incorreto")
            return ("usuário ou senha incorreto");
        }
        else{
            const userResponse = await api.get(`usuarios/?search=${usernameInput}`);
            //console.log(userResponse);
            const user = userResponse.data[0];

            localStorage.setItem(`@Project:token`, response.data.token);
            localStorage.setItem(`@Project:user`,JSON.stringify(user));

            setToken(response.data.token);
            setUser({firstname:user.first_name,lastname:user.last_name,id:user.id, foto:user.foto});
            
            console.log(response);
            console.log("Sucesso ao efetuar login")
            
            return "";
        }

        
    }
    function signOut(){ 
        localStorage.clear();
        setToken("");
        setUser({} as User);
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