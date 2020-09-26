import React from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

import LogoBig from '../../assets/images/icons/logo-big.svg'

import { signIn } from '../../services/auth';

import {LoginPage} from './styles';

const Login: React.FC = () => {

  async function handleSignIn() {  
   //normalmente receberia o email e a senha inseridos!!
   const response = await signIn();  //sign in demora um pouco para responder. Posso usar async await ou .then
   console.log(response);
  }

  return (
      <LoginPage>
          <img src={LogoBig} alt=""/>
          <div className="wrap">
            <form action="">
                <Input placeholder="Usuario"></Input>
                <Input placeholder="Senha"></Input>
            </form>
            
            <Button onClick={handleSignIn} title="enviar" ></Button>
          </div>
      </LoginPage>
  );
}

export default Login;