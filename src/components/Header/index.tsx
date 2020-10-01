import React from 'react';

import SmallLogo from '../../assets/images/icons/small-logo.svg'
import HomeIcon from '../../assets/images/icons/home-icon.svg'
import NotificationsIcon from '../../assets/images/icons/notification-icon.svg'
import SearchIcon from '../../assets/images/icons/search-icon.svg'
import LocationIcon from '../../assets/images/icons/location-icon.svg'
import {HeaderComponent} from './styles'
interface HeaderProps {
    profilePicture?: string;
}
const Header: React.FC<HeaderProps> = ({profilePicture}) => {
    return(
        <>
        <HeaderComponent>
            <div className="main-content">
                <div id="logo-container">
                        <a href="./feed"><img src={SmallLogo} alt="logo"/></a>
                        <a id="site-name" href="./feed">Piupiuwer</a>
                    </div>

                <nav id="navigation-container">
                    <a className="navigation-item" href="./feed"><img src={HomeIcon} alt="Pagina principal"/></a>
                    <a className="navigation-item" href="./feed"><img src={NotificationsIcon} alt="Pagina principal"/></a>
                    <a className="navigation-item" href="./feed"><img src={SearchIcon} alt="Pagina principal"/></a>
                    <a className="navigation-item" href="./feed"><img src={LocationIcon} alt="Pagina principal"/></a>
                    <a className="profile-picture" href="./feed" id=""><img src={profilePicture} alt=""/></a>
                </nav>
            

            </div>
            <div className="search-div">
                <input placeholder="Buscar" className="search-input" type="text"/>
            </div>
            
        </HeaderComponent>
        </>
    );
};

export default Header;