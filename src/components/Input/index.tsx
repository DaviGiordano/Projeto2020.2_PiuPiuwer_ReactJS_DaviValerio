import React from 'react';
import {InputComponent} from './styles';
interface InputProps{
    caracterCount:number;
}
const Input: React.FC<InputProps> = ({caracterCount}) => {
    return(
        <InputComponent>
        <div className="" id="wrap">
            <main>
                <textarea name="writePiu" id="writePiu"></textarea>            
            </main>
            <footer>
                <small>{caracterCount}/140</small>
                <button id="send-btn" >Enviar</button>
            </footer>
        </div>
        </InputComponent>
    );
   
}

export default Input;