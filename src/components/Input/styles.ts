import React from 'react';
import styled, {css} from 'styled-components';

export const InputComponent = styled.div`
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
    }
    footer{
        display:flex;
        justify-content:space-between;
    }
    small{
        margin-top:0.4rem;
        font-size:0.8rem;
    }
    button{
        margin-top:0.4rem;
        width: 4rem;
        height: 2rem;
        margin-bottom: 10px;
        background: #003F88;
        -webkit-box-shadow:0 0 5px rgba(0, 0, 0, 0.5);
        -moz-box-shadow:0 0 5px rgba(0, 0, 0, 0.5);
        box-shadow:0 0 5px rgba(0, 0, 0, 0.5);
        border: 2px solid #003F88;
        border-radius: 13px;
        font-family: 'Quicksand';
        font-style: normal;
        font-weight: 500;
        color: #FFFFFF;

    &:hover{
        cursor: pointer;
    }
    }
`;