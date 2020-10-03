import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import Piu,{PiuProps} from '../../components/Piu'
import Header from '../../components/Header/';
import Textarea from '../../components/Textarea/';
import Button from '../../components/Button';

import { Container } from './styles';

import  { useAuth, UserApi, PiuData, Following } from '../../contexts/auth';

const Feed: React.FC = () => {
  
  const {signOut, user, token, changeUser} = useAuth();

  const [pius, setPius] = useState<Array<PiuData>>([]);
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [alert, setAlert] = useState<string>('');
  const [textareaColor, setTextareaColor] = useState<string>('black');
  const [buttonOpacity, setButtonOpacity] = useState<number>(1);
  const [pinnedPius,setPinnedPius] = useState<Array<PiuData>>([]);
                                              // antes: ()
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
      console.log("BBBBBBBBB")

      return usuariosQueDeramLike.includes(user?.id);
    }) 
    return likedPius.map(piu => piu.id)
  },[user, pius]);

  const piusByFollowedUsersIds = useMemo(()=>{

    const piusByFollowedUsers = pius.filter(piu => {
      console.log(user.seguindo)
      const usernamesIamFollowing = user.seguindo.map((item) => item.username);
      //console.log(usernamesIamFollowing)
      return usernamesIamFollowing.includes(piu.usuario.username)
    })
    return piusByFollowedUsers.map(piu => piu.id)
  },[user, pius]);
  
  const setSortedPius = useCallback((newPius: Array<PiuData>) => {
    const favoritedPiusIdsLocal = favoritedPiusIdsCallback(newPius);
    function compare(a: PiuData, b: PiuData){
      // console.log({
      //   result:(favoritedPiusIdsLocal.includes(b.id)? 1 : 0 ) - (favoritedPiusIdsLocal.includes(a.id)? 1 : 0),
      //   favoritedPiusIdsLocal,
      //   a:a.id,
      //   b:b.id,
      //   includeA: favoritedPiusIdsLocal.includes(a.id),
      //   includeB: favoritedPiusIdsLocal.includes(b.id)
      // });
      return (favoritedPiusIdsLocal.includes(b.id)? 1 : 0 ) - (favoritedPiusIdsLocal.includes(a.id)? 1 : 0);
    }
    newPius.sort(compare);
    setPius(newPius);
    //console.log(newPius);
  },[setPius,favoritedPiusIdsCallback]);

  //useEffect(() => setSortedPius(pius), [favoritedPiusIds, setSortedPius, pius]);


  /*DECLARAÇÃO DE handleGetPius */
  async function handleGetPius(){
    const response = await axios({
      url: 'http://piupiuwer.polijr.com.br/pius/',
      method: 'GET',
      headers: {
          Authorization: `JWT ${token}`
    }
    })
    setSortedPius(response.data);
    //console.log(response.data)
  }
  
  /*CHAMADA DE handleGetPius */
  useEffect(()=>{
    if(!!token){
      handleGetPius();
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
          console.log(response.data);
          
          /*ADIÇAO DIRETA DO PIU À LISTA */
          if(response.data){
            setSortedPius([response.data, ...pius]);
            console.log(pius);
          }
        }
      }
  },[user,setAlert,setTextareaValue,setSortedPius,token,pius]);
    /*"Você vai esquecer algum dia - Falcs" */
  

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
      
      console.log("hey");
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
      console.log(response);
      
      handleGetPius();
    },[token, user]);

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
      handleGetPius();
   
    }, [token, user]);
  
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
     console.log(response);

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
  

  const handleTest= useCallback(() => {

//    console.log(token);
  //  console.log(pius);
    return 1;
  },[token,pius]);
  

  

 

  return (
    <Container>
      <Header isSettings={false} profilePicture={user?.foto} handleDesconectar={signOut}/>

      <Button title="Sign out" onClick={handleSignOut} ></Button>
      <Button title="Teste" onClick={handleTest}></Button>
      <Button title="Reload" onClick={handleGetPius}></Button>

      <Textarea 
      color={textareaColor} 
      placeholder="O que você está ciscando hoje?" 
      caracterCount={textareaValue.length} 
      value={textareaValue} 
      onChange={(e) => {setTextareaValue(e.target.value)}}>
      
      <p id="alert-message">{alert}</p>
        
      <Button 
      id="send-btn" 
      title="Enviar" 
      buttonOpacity={buttonOpacity} 
      onClick={()=>{sendPiu(textareaValue)}}
      ></Button>
      
      </Textarea>
     
      <main>
        {
        renderPius()
        }
      </main>

    </Container>);
}

export default Feed;