import { useState } from "react";
import styled from "styled-components"
import ButtonDay from "./ButtonDay"
import ButtonDayForHabits from "./ButtonDayForHabits";
import trash from "../assets/imgs/trash.svg"
export default function Habit({ name, days }) {
    const [defaultDays, setDefaultDays] = useState([
        { value: 1, day: 'D' },
        { value: 2, day: 'T' },
        { value: 3, day: 'Q' },
        { value: 4, day: 'Q' },
        { value: 5, day: 'S' },
        { value: 6, day: 'S' },
        { value: 0, day: 'S' },
    ]);
    const [disabled, setDisabled] = useState(false)
    return (
        <StyledContainer>
            <StyledTitle>
                <h1>{name}</h1>
                <img src={trash} onClick={()=>alert("APAGAR")}/>
            </StyledTitle>
            <ButtonsContainer>
                {defaultDays.map((d) =>
                    <ButtonDayForHabits
                        key={d.value}
                        value={d.value}
                        days={days}
                    >
                        {d.day}
                    </ButtonDayForHabits>
                )}
            </ButtonsContainer>
        </StyledContainer>
    )
}

const StyledTitle = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
h1{
    font-size: 20px;
}
`

const ButtonsContainer = styled.div`
display: flex;
margin-top: 8px;
`

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 10px;
    background-color: white;
    width: 100%;
    height: 91px;
    margin-bottom: 10px;
`