import styled from 'styled-components';

export const TextareaComponent = styled.div`
    max-width:100%;
    margin:1rem;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    #wrap{
        width:60%;
        max-width:30rem;

    }
    main{
        min-width:100%;
        display:flex;
        justify-content:center;
    }
    textarea{
        min-width:100%;
        height:4rem;
        width:30rem;
        border-radius:1rem;
        border-color:black;
        padding:0.6rem;
        background:none;
    }
    footer{
        display:flex;
        justify-content:space-between;
    }
    small{
        margin-top:0.4rem;
        font-size:0.8rem;
    }
    
`;