import React from 'react';
import Piu from '../../components/Piu'
import Header from '../../components/Header/';
import Textarea from '../../components/Textarea/';
import { Container } from './styles';
import Button from '../../components/Button';
import  { useAuth } from '../../contexts/auth';
import { signIn } from '../../services/auth';

const Feed: React.FC = () => {
  const {signOut, user} = useAuth();

  function handleSignOut() {
    signOut();
  }
  return (
    <Container>
      <Header/>
      <Button title="Sign out" onClick={handleSignOut} ></Button>
      <p>{user?.name /*?. significa que vai mostar só se nao for nulo */}</p> 
      
      <Textarea caracterCount={0} />
      <Piu
         piuwerName="Davi Giordano"
         piuwerPicture="https://avatars1.githubusercontent.com/u/69208456?s=460&u=abb281e389b7d7dc9a72e158aae87d1eeecaab8e&v=4" 
         text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris augue neque graves in "
         isLiked={false}
         isPinned={true}
         likeCount={123}         
         />
    </Container>);
}

export default Feed;