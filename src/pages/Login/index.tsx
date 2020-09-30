import React, { useState } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';
import {LoginPage} from './styles';

import LogoBig from '../../assets/images/icons/logo-big.svg'

import  { useAuth } from '../../contexts/auth';

const Login: React.FC = () => {

  const {signIn} = useAuth(); 

  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [signInResponse, setsignInResponse] = useState<string>('');
  async function handleSignIn(usernameInput:string, passwordInput:string) {
      const response = await signIn(usernameInput, passwordInput);
      setsignInResponse(response);

  }
 

  return (
    
      <LoginPage>
          <img src={LogoBig} alt=""/>
          <div className="wrap">
            <form action="">
                <Input value={usernameInput} onChange={(e) => {setUsernameInput(e.target.value)}} id="inputUsername" placeholder="Usuario"></Input>
                <Input value={passwordInput} onChange={(e) => {setPasswordInput(e.target.value)}} id="inputPassword" placeholder="Senha"></Input>
            </form>
            <p>{signInResponse}</p>
            <Button onClick={() => {handleSignIn(usernameInput,passwordInput)}} title="enviar" ></Button>
          </div>
      </LoginPage>
  );
}

export default Login;