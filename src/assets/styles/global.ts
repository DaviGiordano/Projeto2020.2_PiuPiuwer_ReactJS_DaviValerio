
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    #root{
        font-size: 40%;
        --color-background: #F0F0F7;
        --color-primary-light: #F5F8FC;
        --color-primary: #C1D9FC;
        --color-primary-dark: #86B5FD;
        --color-line-in-white: #E6E6F0;

        /*
        --color-primary-lighter: #9871F5;

        --color-primary-darker: #6842C2;
        --color-secundary: #04D361;
        --color-secundary-dark: #04BF58;
        --color-title-in-primary: #FFFFFF;
        --color-text-in-primary: #D4C2FF;
        --color-text-title: #32264D;
        --color-text-complement: #9C98A6;
        --color-text-base: #6A6180;
        --color-input-background: #F8F8FC;
        --color-button-text: #FFFFFF;
        --color-box-base: #FFFFFF;
        --color-box-footer: #FAFAFC;  
        */   
        #86B5FD 0%, #C1D9FC 14.58%, #F5F8FC
    }

	* {
		margin: 0;
		padding: 0;
		outline: 0;
    }
        
    body,
    input,
    button,
    textarea,
    a,
    p{
        font: 500 1rem Quicksand;
    }

    @media (min-width: 700px){ 
        #root{
            font-size: 62.5%;
        }
    }
`;
