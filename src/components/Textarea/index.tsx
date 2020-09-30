import React, { TextareaHTMLAttributes } from 'react';
import {TextareaComponent} from './styles';
import Button from '../Button/';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    caracterCount:number;
}
const Textarea: React.FC<TextareaProps> = ({caracterCount, children, ...rest}) => {
    return(
        <TextareaComponent >
        <div className="" id="wrap">
            <main>
                <textarea {...rest} name="writePiu" id="writePiu"></textarea>            
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