import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components"
import ButtonDay from "./ButtonDay";
import { BASE_URL } from "../constants/urls"
import { LoginContext } from "../Contexts/LoginContext";

export default function CreateHabit({ setCreateHabitBtn, form, setForm, days, setDays }) {
    const { user, setUser } = useContext(LoginContext)

    const [disabledSwitch, setDisabledSwitch] = useState(false);
    const [notDisabledSwitch, setNotDisabledSwitch] = useState(true);
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })

    }

    function onSubmit(e) {
        e.preventDefault();
        if (form.days.length === 0) {
            alert("Você deve inserir ao menos um dia!")
            setDisabledSwitch(false)
            setNotDisabledSwitch(true)
        }
        else {
            setDisabledSwitch(true)
            setNotDisabledSwitch(false)

            axios.post(`${BASE_URL}/habits`, form, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then(res => {
                    setDisabledSwitch(false)
                    setNotDisabledSwitch(true)
                    setCreateHabitBtn(false)
                    setForm({ name: '', days: [] })
                    setDays(
                        [
                            { value: 0, day: 'D', clicked: false },
                            { value: 1, day: 'S', clicked: false },
                            { value: 2, day: 'T', clicked: false },
                            { value: 3, day: 'Q', clicked: false },
                            { value: 4, day: 'Q', clicked: false },
                            { value: 5, day: 'S', clicked: false },
                            { value: 6, day: 'S', clicked: false },
                        ]
                    )
                    setUser({ ...user, change: !user.change })
                })
                .catch(err => {
                    alert(err.response)
                    setDisabledSwitch(false)
                    setNotDisabledSwitch(true)
                })
        }
    }

    return (
        <CreateHabitContainer>
            <TitleContainer>
                <form onSubmit={onSubmit}>
                    <input data-identifier="input-habit-name" name='name' onChange={handleChange} value={form.name} type='text' placeholder="nome do hábito" maxLength="40" required disabled={disabledSwitch} />
                    <ButtonsContainer>
                        {days.map((d) =>
                            <ButtonDay
                                key={d.value}
                                clicked={d.clicked}
                                value={d.value}
                                days={days}
                                setDays={setDays}
                                setForm={setForm}
                                form={form}
                                disabled={disabledSwitch}
                            >
                                {d.day}
                            </ButtonDay>)}
                    </ButtonsContainer>
                    <FinishHabitDiv>
                        <StyledCancelButton data-identifier="cancel-habit-create-btn" type="button" onClick={() => setCreateHabitBtn(false)} disabled={disabledSwitch}>Cancelar</StyledCancelButton>
                        <StyledButton disabled={disabledSwitch} type="submit">
                            <StyledButtonText data-identifier="save-habit-create-btn" visible={notDisabledSwitch}>
                                Salvar
                            </StyledButtonText>
                            <ThreeDots width={'50'} color="white" visible={disabledSwitch} />
                        </StyledButton>
                    </FinishHabitDiv>
                </form>
            </TitleContainer>
        </CreateHabitContainer>
    )
}

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
`
const StyledCancelButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: #52B6FF;
    font-size: 15.976px;
`


const StyledButtonText = styled.h1`
    display: ${props => props.visible ? 'contents' : 'none'};
`

const FinishHabitDiv = styled.div`
    display: flex;
    span{    
    color:#52B6FF
    }
    button{
        filter:brightness(${props => props.disable ? 0.95 : 1});
        margin-left: 23px;
        width: 84px;
        height: 35px;
    }
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
`

const TitleContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
`

const ButtonsContainer = styled.div`
    display: flex;
`
const CreateHabitContainer = styled.div`
    margin-top: 22px;
    background-color: white;
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    input{
        margin-top: 18px;
        margin-bottom: 8px;
    }

`