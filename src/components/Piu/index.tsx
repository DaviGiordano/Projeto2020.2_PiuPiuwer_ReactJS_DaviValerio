import React, {ButtonHTMLAttributes} from 'react';

import likedIcon from '../../assets/images/icons/liked-icon.svg';
import notLikedIcon from '../../assets/images/icons/notLiked-icon.svg';
import pinnedIcon from '../../assets/images/icons/pinned-icon.svg';
import notPinnedIcon from '../../assets/images/icons/notPinned-icon.svg';
import trashIcon from '../../assets/images/icons/trash-icon.svg';
import {PiuComponent} from './styles';

export interface PiuProps extends ButtonHTMLAttributes<HTMLButtonElement>{

    piuwerPicture?:string;
    piuwerName?:string;
    text?:string;
    isLiked?:boolean;
    isPinned?:boolean;
    isDeletable?:boolean;
    likeCount?:number;
    handlePin(): void;
    handleDel(): void;

}

const Piu: React.FC<PiuProps> = ({piuwerName,handlePin, isDeletable, handleDel, piuwerPicture,text, isLiked,isPinned, likeCount, ...rest}) => {

    return(
    <PiuComponent>
        <div id="piu-wrap">
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

                <div className="pinDiv" onClick={()=> {handlePin()}} >
                    <img src={isPinned? pinnedIcon : notPinnedIcon} alt=""/>
                </div>
                <div className="delDiv"  onClick={()=> {handleDel()}} >
                    <img src={trashIcon} alt=""/>
                </div>

            </footer>
        </div>
        
    </PiuComponent>
    );
    
}

export default Piu;
