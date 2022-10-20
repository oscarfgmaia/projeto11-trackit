import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components"
import ButtonDay from "./ButtonDay";
import { BASE_URL } from "../constants/urls"
import { LoginContext } from "../Contexts/LoginContext";

export default function CreateHabit({ setCreateHabitBtn }) {
    const { user } = useContext(LoginContext)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTk2OSwiaWF0IjoxNjY2MjA1MTkzfQ.LRHldZEEV5qM_kSKl4wcLBcGhJwAIiIHwWW_dPVke7s"
    const [days, setDays] = useState([
        { value: 0, day: 'D', clicked: false },
        { value: 1, day: 'S', clicked: false },
        { value: 2, day: 'T', clicked: false },
        { value: 3, day: 'Q', clicked: false },
        { value: 4, day: 'Q', clicked: false },
        { value: 5, day: 'S', clicked: false },
        { value: 6, day: 'S', clicked: false },
    ]);
    const [onlyDays, setOnlyDays] = useState([])
    const [form, setForm] = useState({ name: '', days: onlyDays })
    const [disabledSwitch, setDisabledSwitch] = useState(false);
    const [notDisabledSwitch, setNotDisabledSwitch] = useState(true);
    function handleChange(e) {
        console.log(e.target.value)
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
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data)
                    setDisabledSwitch(false)
                    setNotDisabledSwitch(true)
                    setCreateHabitBtn(false)
                })
                .catch(err => {
                    console.log(err.response.data.message)
                    setDisabledSwitch(false)
                    setNotDisabledSwitch(true)
                })
        }
    }

    return (
        <CreateHabitContainer>
            <TitleContainer>
                <form onSubmit={onSubmit}>
                    <input name='name' onChange={handleChange} value={form.name} type='text' placeholder="nome do hábito" required disabled={disabledSwitch} />
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
                        <StyledCancelButton type="button" onClick={() => setCreateHabitBtn(false)} disabled={disabledSwitch}>Cancelar</StyledCancelButton>
                        <StyledButton disabled={disabledSwitch} type="submit">
                            <StyledButtonText visible={notDisabledSwitch}>
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