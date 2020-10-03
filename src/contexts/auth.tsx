import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import * as auth from '../services/auth';
import api from '../services/api';

export interface UserApi{
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    sobre: string;
    foto: string;
    seguindo:Array<{id:number,username:string}>

}
export interface PiuData{
    id: number;
    usuario: UserApi;
    likers: Array<UserApi>;
    favoritado_por: Array<UserApi>;
    texto: string;
    horario: string;
}
export interface Following{
    
    id:number,
    username:string
    
}
export interface AuthContextData {
    user: UserApi;
    token: string;
    signIn(usernameInput:string, passwordInput:string): Promise<string>;
    signOut(): void;
    changeUser(username:string): Promise<void>;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
   
    const [user, setUser] = useState<UserApi>({} as UserApi);
    const [token, setToken] = useState<string>('');
    
    useEffect(()=>{

        async function loadStorageData(){ 
            const storagedToken = localStorage.getItem(`@Project:token`);
            const storagedUser = localStorage.getItem(`@Project:user`);
            console.log(storagedUser)
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
            setUser({first_name:user.first_name,
                    last_name:user.last_name,
                    id:user.id,
                    foto:user.foto,
                    username: user.username,
                    email: user.email,
                    sobre: user.sobre,
                    seguindo: user.seguindo
                });
            
            console.log(user);
            console.log("Sucesso ao efetuar login")
            
            return "";
        }

        
    }
    const changeUser = useCallback(async (username:string) => {
        const newUser = await api.get("/usuarios/?search=" + username);
        setUser(newUser.data);
        localStorage.removeItem(`@Project:user`);
        localStorage.setItem(`@Project:user`,JSON.stringify(user));
        
    }, [user]);
    
    
    function signOut(){ 
        localStorage.clear();
        setToken("");
        setUser({} as UserApi);
    }
    
    return(
    <AuthContext.Provider value={{ token, user, signIn, signOut, changeUser}}>
        {children}
    </AuthContext.Provider>
);
};

export function useAuth() {
    
    const context = useContext(AuthContext);
    return context;
}