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
//cria um contexto AuthContext que pode ser passado como parâmetro para useContext()
//AuthContext é tipado como AthContextData
//um objeto vazio, mas como AuthContextData é passado como parâmetro para a createContext()
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    //são criados os estados user e loading, com useState, passando seus parâmetros iniciais
    //e tipando o user como User ou null.
    //useState também retorna uma função para atualizar esse parâmetro
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    
    //useEffect é ativado ao iniciar a página, ou a serem modificadas as variáveis dependentes,
    //definidas no array como segundo parâmetro
    useEffect(()=>{
        function loadStorageData(){ //usuario deu reload na pagina
            //recuperar dados do localStorage
            const storagedUser = localStorage.getItem('PiuPiuer:user');
            const storagedToken = localStorage.getItem('PiuPiuer:token');
            
            //código para fazer com que o token retornado seja usado como header de qualquer chamada à API
            api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
            // O QUE USAR AQUI EM VEZ DE HEADER? api.defaults.header['Authorization'] = `Bearer ${storagedToken}`;

            //se eu possuir o Token e o Usuário, transformo o user em JSON  e paro o "loading".
            if(storagedToken && storagedUser){
                setUser(JSON.parse(storagedUser));
                setLoading(false);
            }
        }
        //Ativar o local storage!
        loadStorageData();
    }, []);

    async function signIn() { //usuário fez login
        //chama a função signIn que está em services e guarda o retorno em response
        const response = await auth.signIn();
        //Atualiza o componente User com os dados de response.user
        setUser(response.user);

        //código para fazer com que o token retornado seja usado como header de qualquer chamada à API
        api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

        //guarda no local storage o user e o token
        localStorage.setItem('PiuPiuer:user', JSON.stringify(response.user));
        localStorage.setItem('PiuPiuer:token', (response.token));
    }
    function signOut(){ //usuário apertou sign out
        //limpa o local storage
        localStorage.clear();
        //atualiza o User para null
        setUser(null);
    }
    //AuthProvider retorna o AuthContext, provedor dos dados,
    // e carrega consigo todos os parâmetros necessários em outros components em value={{}}
    //, além do children
    return(
    <AuthContext.Provider value={{signed: !!user, user, signIn,loading, signOut}}>
        {children}
    </AuthContext.Provider>
);
};

export function useAuth() {
    //use auth chama useContext passando AuthContext
    const context = useContext(AuthContext);
    //retorna o retorno de useContext
    return context;
}