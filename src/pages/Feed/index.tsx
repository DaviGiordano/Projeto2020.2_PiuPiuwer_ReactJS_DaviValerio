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
  const [textareaValue, setTextareaValue] = useState<string>("");
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
  useEffect(()=>{},[textareaValue]);
  
  async function sendPiu(mensagemInput:string) {

    if(user?.id){
      if(!mensagemInput){
        console.log("campo vazio")
      }else if(mensagemInput.length>140){
        console.log("maior do que 140")
      }else{
        const userId = user.id;
        const mensagem = mensagemInput;
        console.log(userId);
        console.log(mensagem);
  
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
         //setPius([...pius, response]);
      }
      
    }
 
  }
  async function handleDelete() {
    const piuId = 251
 
   const response = await axios({
      url: `http://piupiuwer.polijr.com.br/pius/${piuId}`,
      method: 'DELETE',
      headers: {
          Authorization: `JWT ${token}`
      }
   })

    
  }
  

  
  
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
      <Button title="Delete Piu" onClick={handleDelete}></Button>
      
      <Textarea caracterCount={textareaValue.length} value={textareaValue} onChange={(e) => {setTextareaValue(e.target.value)}}>
        <Button title="Enviar" onClick={()=>{sendPiu(textareaValue)}}></Button>
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