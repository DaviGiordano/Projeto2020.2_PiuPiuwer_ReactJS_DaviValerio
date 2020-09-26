import React from 'react';
import GlobalStyle from './assets/styles/global';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';

import Routes from './routes';
function App(){
    
    return(
        <>
        <BrowserRouter>
            <AuthProvider>
              <Routes />
            </AuthProvider>            
         </BrowserRouter>
        <GlobalStyle />
        </>
    );
}

export default App;
/*
<>
        <Header profilePicture="https://avatars1.githubusercontent.com/u/69208456?s=460&u=abb281e389b7d7dc9a72e158aae87d1eeecaab8e&v=4"/>
        <Input caracterCount={0} ></Input>
        
        <Piu
         piuwerName="Davi Giordano"
         piuwerPicture="https://avatars1.githubusercontent.com/u/69208456?s=460&u=abb281e389b7d7dc9a72e158aae87d1eeecaab8e&v=4" 
         text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris augue neque graves in "
         isLiked={false}
         isPinned={true}
         likeCount={123}         
         />
        <Piu
         piuwerName="Davi Giordano"
         piuwerPicture="https://avatars1.githubusercontent.com/u/69208456?s=460&u=abb281e389b7d7dc9a72e158aae87d1eeecaab8e&v=4" 
         text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris augue neque graves in "
         isLiked={false}
         isPinned={true}
         likeCount={123}         
         />
        <Piu
         piuwerName="Davi Giordano"
         piuwerPicture="https://avatars1.githubusercontent.com/u/69208456?s=460&u=abb281e389b7d7dc9a72e158aae87d1eeecaab8e&v=4" 
         text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris augue neque graves in "
         isLiked={false}
         isPinned={true}
         likeCount={123}         
         />
        <Piu
         piuwerName="Davi Giordano"
         piuwerPicture="https://avatars1.githubusercontent.com/u/69208456?s=460&u=abb281e389b7d7dc9a72e158aae87d1eeecaab8e&v=4" 
         text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris augue neque graves in "
         isLiked={false}
         isPinned={true}
         likeCount={123}         
         />
        </>
        */