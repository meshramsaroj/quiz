import styled from "styled-components";

type ButtonWrapperProps = {
    correct: boolean;
    userClicked: boolean;
}

export const ButtonWrapper = styled.div<ButtonWrapperProps> `

transition : all 0.3s ease;

:hover {
    opacity : 0.8
}

button {
    cursor : pointer;
    background : ${({ correct, userClicked }) =>
        correct
            ? 'linear-gradient(90deg,#56ffa4, #59bc86)'
            : !correct && !userClicked
                ? 'linear-gradient(90deg,#ff5656, #c16868)'
                : 'linear-gradient(90deg,#56ccff, #6eafb4)'}
    border : 1px solid white;

}


`
