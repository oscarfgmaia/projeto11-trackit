import { useContext, useState } from "react";
import styled from "styled-components"
import ButtonDayForHabits from "./ButtonDayForHabits";
import trash from "../assets/imgs/trash.svg"
import axios from "axios";
import { BASE_URL } from "../constants/urls";
import { LoginContext } from "../Contexts/LoginContext";

export default function Habit({ name, days, id, setHandleUseEffect, handleUseEffect }) {
    const { user } = useContext(LoginContext);

    function deleteHabit() {
        if (window.confirm("Você têm certeza que deseja excluir esse hábito?") == true) {

            axios.delete(`${BASE_URL}/habits/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
                .then(res => {
                    setHandleUseEffect(!handleUseEffect)
                })
                .catch(err => {
                    console.log(err.response.data.message)
                })
        }
    }

    const [defaultDays, setDefaultDays] = useState([
        { value: 0, day: 'D' },
        { value: 1, day: 'S' },
        { value: 2, day: 'T' },
        { value: 3, day: 'Q' },
        { value: 4, day: 'Q' },
        { value: 5, day: 'S' },
        { value: 6, day: 'S' },
    ]);

    return (
        <StyledContainer>
            <StyledTitle>
                <h1>{name}</h1>
                <img src={trash} onClick={deleteHabit} />
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
align-items: flex-start;
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