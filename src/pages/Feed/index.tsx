import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import Piu from '../../components/Piu'
import Header from '../../components/Header/';
import Textarea from '../../components/Textarea/';
import Button from '../../components/Button';

import { Container } from './styles';

import  { useAuth, UserApi, PiuData } from '../../contexts/auth';

const Feed: React.FC = () => {
  
  const {signOut, user, token, changeUser} = useAuth();

  const [pius, setPius] = useState<Array<PiuData>>([]);
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [alert, setAlert] = useState<string>('');
  const [textareaColor, setTextareaColor] = useState<string>('black');
  const [buttonOpacity, setButtonOpacity] = useState<number>(1);

  const handleGetPius = useCallback(async () => {
    const response = await axios({
      url: 'http://piupiuwer.polijr.com.br/pius/',
      method: 'GET',
      headers: {
          Authorization: `JWT ${token}`
    }
    })
    if(response.data){
      console.log(response.data);
      setSortedPius(response.data);
    }
  },[token]);

  const favoritedPiusIdsCallback = useCallback((pius: Array<PiuData>)=>{
    const favoritedPius = pius.filter(piu => {
      const usuariosQueFavoritaram = piu.favoritado_por.map((item: UserApi) => item.id);
      return usuariosQueFavoritaram.includes(user.id);
    })
    return favoritedPius.map(piu => piu.id)
  },[user,pius]);

  const favoritedPiusIds = useMemo(
    () => favoritedPiusIdsCallback(pius)
    ,[user, pius]
  );
  

  const likedPiusIds = useMemo(()=>{
    const likedPius = pius.filter(piu => {
      const usuariosQueDeramLike = piu.likers.map((item: UserApi) => item.id);
      return usuariosQueDeramLike.includes(user?.id);
    }) 

    return likedPius.map(piu => piu.id)
  },[user, pius]);


  const piusByFollowedUsersIds = useMemo(()=>{
    const piusByFollowedUsers = pius.filter(piu => {
      const usernamesIamFollowing = user.seguindo.map((item) => item.username);
      return usernamesIamFollowing.includes(piu.usuario.username)
    })
    return piusByFollowedUsers.map(piu => piu.id)
  },[user, pius]);
  

  const setSortedPius = useCallback((newPius: Array<PiuData>) => {
    const favoritedPiusIdsLocal = favoritedPiusIdsCallback(newPius);

    function compare(a: PiuData, b: PiuData){
      return (favoritedPiusIdsLocal.includes(b.id)? 1 : 0 ) - (favoritedPiusIdsLocal.includes(a.id)? 1 : 0);
    }

    newPius.sort(compare);
    setPius(newPius);
  },[setPius,favoritedPiusIdsCallback,user]);
  
  
  /*CHAMADA DE handleGetPius */
  useEffect(()=>{
    if(!!token){
      handleGetPius();
      console.log(favoritedPiusIds);
    }
  },[token]);

  /*DECLARAÇÃO DE sendPiu */
  const sendPiu = useCallback( async (mensagemInput:string)=>{

      /*Tratamento dos erros de input */
    if(user?.id){
      if(!mensagemInput){
        setAlert("Campo vazio")
      }else if(mensagemInput.length>140){
        setAlert("Limite de caracteres ultrapassado")
      }else{
        setTextareaValue("");
        setAlert("");

        /*CHAMADA À API */
        const response = await axios({
            url: 'http://piupiuwer.polijr.com.br/pius/',
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`
            },
            data: {
                usuario: user.id,
                texto: mensagemInput
            }
        })
          
        /*ADIÇAO DIRETA DO PIU À LISTA */
        if(response.data){
          setSortedPius([response.data, ...pius]);
        }
      }
    }
  },[user,setAlert,setTextareaValue,setSortedPius,token,pius]);
  

  /*PROPS TEXTAREA */
  useEffect(()=>{
    if(textareaValue.length>140){
      setTextareaColor('red');
      setButtonOpacity(0.6);
    }else{
      setTextareaColor('black');
      setButtonOpacity(1);
      setAlert("")
    }
  },[textareaValue.length])


  const delThisPiu = useCallback( async (piu: PiuData)=>{
    const piuId = piu.id
    const response = await axios({
      url: `http://piupiuwer.polijr.com.br/pius/${piuId}`,
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    handleGetPius();
  },[token]);


  const pinThisPiu = useCallback( async (item:PiuData) => {
    const userId = user.id
    const piuId = item.id
    const response = await axios({
      url: 'http://piupiuwer.polijr.com.br/pius/favoritar/',
      method: 'POST',
      headers: {
          Authorization: `JWT ${token}`
      },
      data: {
        usuario: userId,
        piu: piuId
      }
    })
    const newPius = pius.map( piu =>{
      const favoritadosUsernames = piu.favoritado_por.map(favoritado_por => favoritado_por.username);
      if(piu.id === item.id){
        if(favoritadosUsernames.includes(user.username)){
          const newFavoritados = piu.favoritado_por.filter(item => item.username != user.username);
          
          piu.favoritado_por = newFavoritados; 
          console.log(piu.favoritado_por);
          //console.log(newFavoritados);
        }
        else{
          piu.favoritado_por.push(user);
          console.log(piu.favoritado_por);
        }
      }
    return piu;
    });
    console.log(newPius);
    setSortedPius(newPius);
      
    //handleGetPius();
  }, [token, user,pius,setSortedPius]);

  /*RETIRAR O HANDLE GET PIUS DO LIKE THIS PIU */
  const likeThisPiu = useCallback( async (item:PiuData) => {
    const userId = user.id
    const piuId = item.id
    const response = await axios({
      url: 'http://piupiuwer.polijr.com.br/pius/dar-like/',
      method: 'POST',
      headers: {
          Authorization: `JWT ${token}`
      },
      data: {
        usuario: userId,
        piu: piuId
      }
    })
    const newPius = pius.map( piu =>{
      const likersUsernames = piu.likers.map(liker => liker.username);
      //console.log(likersUsernames)
      if(piu.id === item.id){
        if(likersUsernames.includes(user.username)){
          const newLikers = piu.likers.filter(item => item.username != user.username);
          
          piu.likers = newLikers; 
          console.log(piu.likers);
          console.log(newLikers);
        }
        else{
          piu.likers.push(user);
        }
      }
    return piu;
    });
    setSortedPius(newPius);
    
  }, [token, user,pius,setSortedPius]);
  
  const followThisUser = useCallback( async (item:PiuData) => {
    const userToFollowId = Number(item.usuario.id);
    const currentUserId = Number(user.id);
    const response = await axios({
      url: 'http://piupiuwer.polijr.com.br/usuarios/seguir/',
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`
      },
      data: {
          usuario_id: userToFollowId,
          logado_id: currentUserId
      }
    })
    changeUser(user.username);
  },[token,user]);
  /* */
  
  
  /*DECLARAÇÃO RENDER PIUS*/
  const renderPius = useCallback(()=>{
    return pius.map((item) =>{
      return (
        <Piu
          key={item.id}
          piuwerName={item.usuario.first_name + " "+ item.usuario.last_name}
          piuwerPicture={item.usuario.foto}
          text={item.texto}
          isPinned={favoritedPiusIds.includes(item.id)}
          isLiked={likedPiusIds.includes(item.id)}
          isDeletable={item.usuario.id == user.id}
          likeCount={item.likers.length}
          isFollowing={piusByFollowedUsersIds.includes(item.id)}
          handlePin={
            ()=>{pinThisPiu(item)}           
          }
          handleDel={
            ()=>{delThisPiu(item)}
          }
          handleLike={
            () => {likeThisPiu(item)}
          }
          handleFollow={
            () => {followThisUser(item)}
          }
        />
      );
    })
  }, [pinThisPiu,delThisPiu,pius,likedPiusIds,user]);

 
  /*CHAMADA DE SIGNOUT, importada de useAuth */
  const handleSignOut = useCallback(() => {
    signOut();
  },[signOut]);
  
  
  return (
    <Container>

      <Header 
        profilePicture={user?.foto} 
        handleDesconectar={handleSignOut}
      />

      <Textarea 
        color={textareaColor} 
        placeholder="O que você está ciscando hoje?" 
        caracterCount={textareaValue.length} 
        value={textareaValue} 
        onChange={(e) => {setTextareaValue(e.target.value)}}
      >

        <p id="alert-message">{alert}</p>

        <Button 
          id="send-btn" 
          title="Enviar" 
          buttonOpacity={buttonOpacity} 
          onClick={()=>{sendPiu(textareaValue)}}
        ></Button>

      </Textarea>
     
      <main>
        {renderPius()}
      </main>

    </Container>
  );
}

export default Feed;