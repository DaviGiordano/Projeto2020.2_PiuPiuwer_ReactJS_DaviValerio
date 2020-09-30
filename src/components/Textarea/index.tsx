import React from 'react';
import {TextareaComponent} from './styles';
import Button from '../Button/';

interface TextareaProps{
    caracterCount:number;
}
const Textarea: React.FC<TextareaProps> = ({caracterCount, children}) => {
    return(
        <TextareaComponent>
        <div className="" id="wrap">
            <main>
                <textarea name="writePiu" id="writePiu"></textarea>            
            </main>
            <footer>
                <small>{caracterCount}/140</small>
            </footer>
            {children}
        </div>

        </TextareaComponent>
    );
   
}

export default Textarea;