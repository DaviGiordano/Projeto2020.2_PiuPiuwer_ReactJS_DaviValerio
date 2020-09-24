import React from 'react';
import likedIcon from '../../assets/images/icons/liked-icon.svg';
import notLikedIcon from '../../assets/images/icons/notLiked-icon.svg';
import pinnedIcon from '../../assets/images/icons/pinned-icon.svg';
import notPinnedIcon from '../../assets/images/icons/notPinned-icon.svg';


import {PiuComponent} from './styles';

interface PiuProps {
    piuwerPicture:string;
    piuwerName:string;
    text:string;
    isLiked:boolean;
    isPinned:boolean;
    likeCount:number;
}

const Piu: React.FC<PiuProps> = ({piuwerName, piuwerPicture,text, isLiked,isPinned, likeCount}) => {
    return(
    <PiuComponent>
        <header>
            <img src={piuwerPicture} alt="foto perfi"/>
            <strong>{piuwerName}</strong>
        </header>
        <main>
            <p>{text}</p>
        </main>
        <footer>
            <div className="likeDiv">
                <img src={isLiked? likedIcon : notLikedIcon} alt=""/>
                <small>{likeCount}</small>
            </div>
            <div className="pinDiv">
               <img src={isPinned? pinnedIcon : notPinnedIcon} alt=""/>
            </div>
        </footer>
    </PiuComponent>
    );
    
}

export default Piu;
