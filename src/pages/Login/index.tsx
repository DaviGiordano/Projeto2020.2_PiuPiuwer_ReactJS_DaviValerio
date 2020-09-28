import React, { useState } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';
import {LoginPage} from './styles';

import LogoBig from '../../assets/images/icons/logo-big.svg'



import  { useAuth } from '../../contexts/auth';

const Login: React.FC = () => {

  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');



  const {signed, user, signIn} = useAuth(); //chama o nosso hook criado useAuth
  console.log(signed);
  console.log(user);
  
  async function handleSignIn(usernameInput:string, passwordInput:string) {  //normalmente receberia o email e a senha inseridos!!
      signIn(usernameInput, passwordInput);
  }
 

  return (
    //jsx retornado pelo componente (página)
      <LoginPage>
          <img src={LogoBig} alt=""/>
          <div className="wrap">
            <form action="">
                <Input value={usernameInput} onChange={(e) => {setUsernameInput(e.target.value)}} id="inputUsername" placeholder="Usuario"></Input>
                <Input value={passwordInput} onChange={(e) => {setPasswordInput(e.target.value)}} id="inputPassword" placeholder="Senha"></Input>
            </form>
            <p>{}</p>
            <Button onClick={() => {handleSignIn(usernameInput,passwordInput)}} title="enviar" ></Button>
          </div>
      </LoginPage>
  );
}

export default Login;