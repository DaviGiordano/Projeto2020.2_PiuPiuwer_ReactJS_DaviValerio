import styled, {css} from 'styled-components';


export const PiuComponent = styled.div`
    display:flex;
    flex-direction:column; 
    align-items:center;
    #piu-wrap{
        
    width:70%;
    margin:1rem;
    padding:1rem;
    border: 1px solid var(--color-line-in-white);
    border-radius:2rem;
    }
    footer img{
        width:1.6rem;
    }
    
    /*all images */
    header img{
        height:2rem;
    }

    
    /*piuwer name */
    strong{
        margin-left:0.6rem;
        font-size:1rem;

    }
    button{
        background:none;
        border:none;
    }
    
    header{
        display:flex;
        align-items:center;
    }
    header small{
        display: none;
        font-size: 0.8rem;
        margin-left: 1rem;
        &:hover{
            cursor:pointer;
        }
    }
    &:hover{
        header small{
            display: flex;
        }
    }

    main{
        margin: 1rem 0;
    }
    p{
        font-size:1rem;
    }
    footer{
        display:flex;
        justify-content:space-between;
    }
    .firstIcons{
        display:flex;
        height: 30px;
        width:max-content;
        align-items:center;
        justify-content:center;
    }
    .likeDiv{
        display:flex;
        align-items:center;
        
        &:hover{
            cursor: pointer;
        }
    }
    .pinDiv{
        &:hover{
            cursor: pointer;
        }
    }
    .delDiv{
        
        &:hover{
            cursor: pointer;
        }
    }
    .likeDiv small{
        margin-left:0.4rem;
        color:red;
        font-size:0.8rem;

    }
    footer div + div{
        margin-left:1rem;
    }
    @media(min-width:800px){
        #piu-wrap{
            max-width:800px;
        }
    }
    
`;