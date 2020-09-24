import React from 'react';
import SmallLogo from '../../assets/images/icons/small-logo.svg'
import HomeIcon from '../../assets/images/icons/home-icon.svg'
import NotificationsIcon from '../../assets/images/icons/notification-icon.svg'
import SearchIcon from '../../assets/images/icons/search-icon.svg'
import LocationIcon from '../../assets/images/icons/location-icon.svg'

import ProfilePicture from '../../assets/images/profile-picture.png'
import {HeaderComponent} from './styles'
interface HeaderProps {
    profilePicture: string;
}
const Header: React.FC<HeaderProps> = ({profilePicture}) => {
    return(
        <>
        <HeaderComponent>
            <div className="main-content">
                <div id="logo-container">
                        <a href=""><img src={SmallLogo} alt="logo"/></a>
                        <a id="site-name" href="">Piupiuwer</a>
                    </div>
                <nav id="navigation-container">
                    <a className="navigation-item" href=""><img src={HomeIcon} alt="Pagina principal"/></a>
                    <a className="navigation-item" href=""><img src={NotificationsIcon} alt="Pagina principal"/></a>
                    <a className="navigation-item" href=""><img src={SearchIcon} alt="Pagina principal"/></a>
                    <a className="navigation-item" href=""><img src={LocationIcon} alt="Pagina principal"/></a>
                    <a className="profile-picture" href="" id=""><img src={profilePicture} alt="Foto perfil"/></a>
                </nav>
            

            </div>
            <div className="search-div">
                <input className="search-input" type="text"/>
            </div>
                
            
            
        </HeaderComponent>
        </>
        /*

        <header id="header-container">
            <nav>
                <a href="#">Explorar</a>
                <a href="#">Buscar</a>
                <a href="#">Notícias</a>
            </nav>
            <img src={SmallLogo} alt="Logo"/>
            <div id="profile-container">
                <img className="profile-picture" src={profilePicture} alt="Foto perfil"/>
                <strong className="profile-name" >{profileName}</strong>
            </div>
 
        </header>*/
    );
};

export default Header;