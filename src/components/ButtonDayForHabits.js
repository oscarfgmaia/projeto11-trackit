import styled from "styled-components"

export default function ButtonDayForHabits({ children,value, days}) {
    console.log(days)
    console.log(value)
    
    return (
        <StyledButton active={days.includes(value)} type="button">{children}</StyledButton>
    )
}

const StyledButton = styled.button`
        box-sizing: border-box;
        min-width: 30px;
        height: 30px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        background-color: ${props=>props.active ? '#CFCFCF' : '#FFFFFF'} ;
        color: ${props=>props.active ? '#FFF' : '#DBDBDB'};
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        margin-right: 4px;
`