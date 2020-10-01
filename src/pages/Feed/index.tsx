import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import Piu,{PiuProps} from '../../components/Piu'
import Header from '../../components/Header/';
import Textarea from '../../components/Textarea/';
import Button from '../../components/Button';

import { Container } from './styles';

import  { useAuth, UserApi, PiuData } from '../../contexts/auth';

const Feed: React.FC = () => {
  
  const {signOut, user, token} = useAuth();

  const [pius, setPius] = useState<Array<PiuData>>([]);
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [alert, setAlert] = useState<string>('');
  const [textareaColor, setTextareaColor] = useState<string>('black');
  const [buttonOpacity, setButtonOpacity] = useState<number>(1);
  const [pinnedPius,setPinnedPius] = useState<any[]>([]);
  
  const favoritedPiusIdsCallback = useCallback(()=>{
    const favoritedPius = pius.filter(piu => {
      const usuariosQueFavoritaram = piu.favoritado_por.map((item: UserApi) => item.id);
      return usuariosQueFavoritaram.includes(user.id);
    })
    return favoritedPius.map(piu => piu.id)
  },[user,pius]);

  const favoritedPiusIds = useMemo(favoritedPiusIdsCallback,[user, pius]);
  
  
  const likedPiusIds = useMemo(()=>{
    const likedPius = pius.filter(piu => {
      const usuariosQueDeramLike = piu.likers.map((item: UserApi) => item.id);
      
      return usuariosQueDeramLike.includes(user?.id);
    }) 
    return likedPius.map(piu => piu.id)
  },[user, pius]);

  const setSortedPius = useCallback((newPius: Array<PiuData>) => {
    const favoritedPiusIdsLocal = favoritedPiusIdsCallback();
    console.log('oi');
    function compare(a: PiuData, b: PiuData){
      console.log({
        result:(favoritedPiusIdsLocal.includes(b.id)? 1 : 0 ) - (favoritedPiusIdsLocal.includes(a.id)? 1 : 0),
        favoritedPiusIdsLocal,
        a:a.id,
        b:b.id,
        includeA: favoritedPiusIdsLocal.includes(a.id),
        includeB: favoritedPiusIdsLocal.includes(b.id)
      });
      return (favoritedPiusIdsLocal.includes(b.id)? 1 : 0 ) - (favoritedPiusIdsLocal.includes(a.id)? 1 : 0);
    }
    newPius.sort(compare);
    setPius(newPius);
    console.log(newPius);
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
    console.log(response.data)
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

  
    async function delThisPiu(piu: PiuData) {
      const piuId = piu.id
      const response = await axios({
        url: `http://piupiuwer.polijr.com.br/pius/${piuId}`,
        method: 'DELETE',
        headers: {
          Authorization: `JWT ${token}`
        }
      })
    }
  
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
          likeCount={item.likers.length}
          handlePin={
            ()=>{pinThisPiu(item)}           
          }
          handleDel={
            ()=>{delThisPiu(item)}
          }
        />
      );
    })
  }, [pinThisPiu,delThisPiu,pius,likedPiusIds,user]);

  /* DECLARAÇÃO RENDER PINNED */
  /*function renderPinned() {
    return pinnedPius.map((item)=>{
      return (
        <Piu
          key={item.id}
          piuwerName={item.usuario.first_name + " "+ item.usuario.last_name}
          piuwerPicture={item.usuario.foto}
          text={item.texto}
          isPinned={true}
          isLiked={item.likers[`username/?search=${user?.id}`]}
          likeCount={item.likers.length}
          handlePin={
            ()=>{unpinThisPiu(item)}           
          }
          handleDel={
            ()=>{delThisPiu(item)}
          }
        />
      );
    })  
  }*/
  
  /*CHAMADA DE SIGNOUT, importada de useAuth */
  function handleSignOut() {
    signOut();
  }

  function handleTest(){
    console.log(token);
    console.log(pius);
    return 1;
  }
  function pinThisPiu(item:PiuData){
    setPinnedPius(pinnedPius => [...pinnedPius, item])
    //const result = pius.filter(piu => piu.id != item.id);
    //setPius(result);
  }
  function unpinThisPiu(item:PiuData){
    const result = pinnedPius.filter(piu => piu.id !== item.id);
    setPinnedPius(result);
  }

  return (
    <Container>
      <Header profilePicture={user?.foto}/>

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