import React, { TextareaHTMLAttributes } from 'react';
import {TextareaComponent} from './styles';
import Button from '../Button/';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    caracterCount:number;
    color?:string;
}
const Textarea: React.FC<TextareaProps> = ({caracterCount,color, children, ...rest}) => {
    return(
        <TextareaComponent color={color} >
        <div className="" id="wrap">
            <main>
                <textarea {...rest} name="writePiu" id="writePiu"></textarea>            
            </main>
            <footer>
                <small>{caracterCount}/140</small>
                {children}

            </footer>

        </div>

        </TextareaComponent>
    );
   
}

export default Textarea;