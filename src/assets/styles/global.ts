
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    #root{
        font-size: 40%;     

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
        font: 500 1.6rem Quicksand;
    }

    @media (min-width: 700px){ 
        #root{
            font-size: 62.5%;
        }
    }
`;
