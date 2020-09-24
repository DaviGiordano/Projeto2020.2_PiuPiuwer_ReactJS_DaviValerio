import React from 'react';
import styled from 'styled-components';

export const PiuComponent = styled.div`
    max-width:100%;
    margin:1rem;
    padding:1rem;
    border: 1px solid black;
    border-radius:2rem;
    /*all images */
    img{
        width:1.6rem;
    }
    /*piuwer picture */
    header img{
        border-radius: 50%;
    }
    /*piuwer name */
    strong{
        margin-left:0.6rem;
        font-size:1rem;

    }
    
    header{
        display:flex;
        align-items:center;
    }
    main{
        margin: 1rem 0;
    }
    p{
        font-size:1rem;
    }
    footer{
        display:flex;
    }
    .likeDiv{
        display:flex;
        align-items:center;
    }
    small{
        margin-left:0.4rem;
        color:red;
        font-size:0.8rem;

    }
    footer div + div{
        margin-left:1rem;
    }

`;