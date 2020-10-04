import styled, {css} from 'styled-components';


export const HeaderComponent = styled.header`
    position: sticky;
    top:0;  
    background: #86B5FD;
    .main-content{
    display:flex;
    max-width:100%;
    height:min-content;
    align-items:center;
    justify-content:space-between;
    padding:0.6rem;
      
    }
    
    #logo-container{
        display:flex;
        align-items:center;
    }
    #logo-container a {
        text-decoration:none;
        font-family: Quicksand;
        font-size:1.4rem;
    }
    #site-name{
        color:#003F88;
    }
    #logo-container img{
        width:50px
    }
    #navigation-container{
        max-width:30rem;
        margin-right:1rem;
        display:flex;
        align-items:center;
        justify-content:center;
    }
    .navigation-item img, .profile-picture{
        width:30px;
        margin-left:1rem;
    }
    
    .exit-icon{
        margin-left:1rem;

        width:25px;
        &:hover{
            cursor:pointer;
        }
    }
    ul{
        top:4rem;
        right:1rem;
        font-size:1rem;
        list-style:none;
        cursor: pointer;
    }
    li + li{
        margin-top:0.5rem;
    }
   
    .profile-picture {

        border-radius:50%;
        &:hover{
            cursor: pointer;
            
        }
    }
    /*
    .search-div{
        width:100%;
        margin-top:0.8rem; 
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .search-input{
        display:block;
        font-family:Quicksand;
        font-size:1rem;
        border-color:black;
        border-radius: 1rem;
        width:10rem;
        padding:0.5rem;
        background:none;
    }
    */
    @media(max-width:410px){
        #logo-container #site-name{
            display:none;
        }
        
        background-color: var(--color-primary);
    
    }
    @media(min-width:1000px){
        /*.search-div{
            z-index:900;
            position:relative;
            bottom:3.9rem;

        }*/
        #navigation-container{
            z-index:1000;
        }
    }
    
`;

