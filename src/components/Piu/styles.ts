import styled from 'styled-components';

export const PiuComponent = styled.div`
    display:flex;
    flex-direction:column; 
    align-items:center;
    #piu-wrap{
        
    width:70%;
    margin:1rem;
    padding:1rem;
    border: 1px solid black;
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
    @media(min-width:800px){
        #piu-wrap{
            max-width:800px;
        }
    }
`;