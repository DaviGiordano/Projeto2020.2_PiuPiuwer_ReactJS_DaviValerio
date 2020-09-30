import styled from 'styled-components';

export const HeaderComponent = styled.header`

    .main-content{
    display:flex;
    max-width:100%;
    height:min-content;
    align-items:center;
    justify-content:space-between;
    border-bottom: 1px solid black;
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

    #logo-container img{
        width:50px
    }
    #navigation-container{
        max-width:30rem;
        margin-right:1rem;
    }
    .navigation-item img, .profile-picture  img{
        width:30px;
        margin-left:1rem;
    }
    .profile-picture  img{
        border-radius:50%;
    }
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
    
    @media(max-width:410px){
        #logo-container #site-name{
            display:none;
        }
    }
    @media(min-width:1000px){
        .search-div{
            position:relative;
            bottom:3.9rem;

        }
    }
    
`;

