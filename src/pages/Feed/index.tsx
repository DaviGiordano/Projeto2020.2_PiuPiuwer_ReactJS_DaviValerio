import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Piu from '../../components/Piu'
import Header from '../../components/Header/';
import Textarea from '../../components/Textarea/';
import Button from '../../components/Button';

import { Container } from './styles';

import  { useAuth } from '../../contexts/auth';
//import { getPius } from '../../services/piu';

const Feed: React.FC = () => {
  
  const {signOut, user, token} = useAuth();

  const [pius, setPius] = useState<any[]>([]);
  useEffect(()=>{
    
      async function handleGetPius(){
        const response = await axios({
          url: 'http://piupiuwer.polijr.com.br/pius/',
          method: 'GET',
          headers: {
              Authorization: `JWT ${token}`
        }
        })
        setPius(response.data);
        console.log(response.data)

      }
      if(!!token){
        handleGetPius();
        console.log(token);      
      }

  },[token]);
  /*
  async function sendPiu(userIdInput:number,mensagemInput:string) { 
  const userId = userIdInput;
   const mensagem = mensagemInput;
 
   const response = await axios({
      url: 'http://piupiuwer.polijr.com.br/pius/',
      method: 'POST',
      headers: {
          Authorization: `JWT ${token}`
      },
      data: {
          usuario: userId,
          texto: mensagem
      }
   })
  }
  */

  
  
  function handleSignOut() {
    signOut();
  }
  function handleTest(){
    console.log(token);
  }

  return (
    <Container>
      <Header/>

      <Button  title="Sign out" onClick={handleSignOut} ></Button>
      <Button title="Test" onClick={handleTest}></Button>
      
      <Textarea caracterCount={0}>
      </Textarea>

      <main>
        {pius.map((item) =>{
        return (<Piu
          key={item.id}
          piuwerName={item.usuario.first_name + " "+ item.usuario.last_name}
          piuwerPicture={item.usuario.foto}
          text={item.texto}
          isPinned={false}
          
          likeCount={item.likers.length}
          />
          );
        })}
      </main>
    </Container>);
}

export default Feed;