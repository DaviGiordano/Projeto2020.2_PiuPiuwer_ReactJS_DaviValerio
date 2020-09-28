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
    signIn(usernameInput:string, passwordInput:string): Promise<void>;
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
    const [signed, setSigned] = useState(false);
    //useEffect é ativado ao iniciar a página, ou a serem modificadas as variáveis dependentes,
    //definidas no array como segundo parâmetro
    useEffect(()=>{

        async function loadStorageData(){ //usuario deu reload na pagina
            //recuperar dados do localStorage
            const storagedSigned = localStorage.getItem('PiuPiuer:signed');
            const storagedToken = localStorage.getItem('PiuPiuer:token');
            
            //gambiarra para fazer esperar um tempo
            await new Promise(resolve => setTimeout(resolve,2000));
    
            //código para fazer com que o token retornado seja usado como header de qualquer chamada à API
            api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
            // O QUE USAR AQUI EM VEZ DE HEADER? api.defaults.header['Authorization'] = `Bearer ${storagedToken}`;

            //se eu possuir o Token e o Usuário, transformo o user em JSON  e paro o "loading".
            if(storagedToken && storagedSigned){
                setSigned(true);
                console.log(JSON.parse(storagedSigned));
                console.log(storagedToken);
            }
        }
        //Ativar o local storage!
        loadStorageData();
    }, []);

    async function signIn(usernameInput:string, passwordInput:string) { //usuário fez login
        //chama a função signIn que está em services e guarda o retorno em response
        const response = await auth.signIn(usernameInput, passwordInput);
        //Atualiza o componente User com os dados de response.user
        //essa linha de código tem algum efeito?
        if(response === "preencha todos os campos"){
            console.log("preencha todos os campos");
            //setSignInResp("preencha todos os campos");
            alert("preencha todos os campos");
            
        }
        else if(response === "usuário ou senha errado"){
            console.log("usuário ou senha errado")
            //setSignInResp("usuário ou senha errado");
            alert("usuário ou senha errado");

        }
        else{
            //setUser(response.data.username);
            setSigned(true);
            //PROBLEMA: A ATUALIZAÇÃO NÃO É INSTANTÂNEA, E NA HORA DE GUARDAR O VALOR NO STORAGE AINDA NÃO ATUALIZOU
            //código para fazer com que o token retornado seja usado como header de qualquer chamada à API
            api.defaults.headers['Authorization'] = `Bearer ${response.data}`;

            //guarda no local storage o user e o token
            //localStorage.setItem('PiuPiuer:user', JSON.stringify(response.data.user));
            localStorage.setItem('PiuPiuer:token', (response.data));
            localStorage.setItem('PiuPiuwer:signed', JSON.stringify(Boolean(true)));
            console.log(response.data);
            console.log(JSON.stringify(true));
            console.log("Sucesso ao efetuar login")
            //setSignInResp("Sucesso!");
            console.log(Boolean(signed));

        }

        
    }
    function signOut(){ //usuário apertou sign out
        //limpa o local storage
        localStorage.clear();
        //atualiza o User para null
        setSigned(false);
    }
  
    //AuthProvider retorna o AuthContext, provedor dos dados,
    // e carrega consigo todos os parâmetros necessários em outros components em value={{}}
    //, além do children
    return(
    <AuthContext.Provider value={{ user, signIn, loading, signed, signOut}}>
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