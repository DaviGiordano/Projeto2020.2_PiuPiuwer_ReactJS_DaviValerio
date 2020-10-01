import styled, {css} from 'styled-components';
interface ButtonProps{
    buttonOpacity:number;
}
export const ButtonComponent = styled.button<ButtonProps>`

        margin-top:0.4rem;
        width: 4rem;
        height: 2rem;
        margin-bottom: 10px;
        background: #003F88;
        -webkit-box-shadow:0 0 5px rgba(0, 0, 0, 0.5);
        -moz-box-shadow:0 0 5px rgba(0, 0, 0, 0.5);
        box-shadow:0 0 5px rgba(0, 0, 0, 0.5);
        border: 2px solid #003F88;
        border-radius: 13px;
        font-family: 'Quicksand';
        font-style: normal;
        font-weight: 500;
        color: #FFFFFF;
        opacity:${props => props.buttonOpacity};

    &:hover{
        cursor: pointer;
    }
    ${props =>
	    props.buttonOpacity<1 &&
        css`
        &:hover{
            cursor: default;
        }
	    `};
`;
