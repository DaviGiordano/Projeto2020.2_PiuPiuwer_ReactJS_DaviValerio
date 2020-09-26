import React from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

import LogoBig from '../../assets/images/icons/logo-big.svg'

import {LoginPage} from './styles';

const Login: React.FC = () => {
  return (
      <LoginPage>
          <img src={LogoBig} alt=""/>
          <div className="wrap">
            <form action="">
                <Input placeholder="Usuario"></Input>
                <Input placeholder="Senha"></Input>
            </form>
            <Button title="enviar"></Button>
          </div>
          

      </LoginPage>
  );
}

export default Login;