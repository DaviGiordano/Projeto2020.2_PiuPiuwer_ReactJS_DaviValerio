import React, {useContext} from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

import LogoBig from '../../assets/images/icons/logo-big.svg'

import { signIn } from '../../services/auth';

import {LoginPage} from './styles';
import AuthContext from '../../contexts/auth';

const Login: React.FC = () => {

  const {signed, user, signIn} = useContext(AuthContext);
  console.log(signed);
  console.log(user);
  
  async function handleSignIn() {  //normalmente receberia o email e a senha inseridos!!
    signIn();

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