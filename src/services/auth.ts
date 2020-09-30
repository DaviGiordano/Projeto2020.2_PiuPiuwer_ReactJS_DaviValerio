import axios from "axios";

export async function signIn(usernameInput:string, passwordInput:string){
    const usuario = usernameInput;
    const senha = passwordInput;
    
    const response = await axios({
        url: 'http://piupiuwer.polijr.com.br/login/',
        method: 'POST',
        data: {
            username: usuario,
            password: senha
        }
     })
     .catch(err => {
         if (!usernameInput || !passwordInput){
            return("preencha todos os campos")
         }
         else{
             return("usuário ou senha errado")
         }
     });
     return (response);   
}

