import styled from "styled-components"

export default function ButtonDay({ children, clicked, value, days, setDays, setForm, form, disabled }) {

    function onClick() {
        const newArr = [...days]
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].value === value) {
                newArr[i].clicked = !newArr[i].clicked;
            }
        }
        let newDays = newArr.filter(e => {
            if (e.clicked === true) {
                return true
            }
        })
        newDays = newDays
        const onlyDaysNumbers = []
        for (let i = 0; i < newDays.length; i++) {
            onlyDaysNumbers.push(newDays[i].value)
        }
        setForm({ ...form, days: onlyDaysNumbers })
        setDays(newArr);
    }


    return (
        <StyledButton type="button" clicked={clicked} onClick={onClick} disabled={disabled}>{children}</StyledButton>
    )
}

const StyledButton = styled.button`
        box-sizing: border-box;
        min-width: 30px;
        height: 30px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        background-color: ${props => props.clicked ? '#CFCFCF' : '#fff'};
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: ${props => props.clicked ? '#FFFFFF' : '#DBDBDB'};
        margin-right: 4px;
`