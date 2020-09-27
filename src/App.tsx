import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './assets/styles/global';

import { AuthProvider } from './contexts/auth';
import Routes from './routes';

function App(){
    //AuthProvider é o context, que engloba todos os componentes com acesso aos dados "globais"
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
