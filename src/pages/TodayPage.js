import Footer from "../components/Footer";
import Header from "../components/Header";
import PagesBackground from "../assets/css/PagesBackground"
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../Contexts/LoginContext";
import axios from "axios";
import { BASE_URL } from "../constants/urls"
import * as dayjs from "dayjs";
import LoadingPage from "../components/LoadingPage"
import TodayHabit from "../components/TodayHabits";
export default function TodayPage() {
    const { user } = useContext(LoginContext);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTk2OSwiaWF0IjoxNjY2MjA1MTkzfQ.LRHldZEEV5qM_kSKl4wcLBcGhJwAIiIHwWW_dPVke7s"
    const dayOfWeek = dayjs().day()
    const dayOfMonth = dayjs().date()
    const monthOfYear = dayjs().month() + 1 // months goes from 0 to 11
    const [habits, setHabits] = useState([])
    const [startPage, setStartPage] = useState(false)
    let week = undefined;
    switch (dayOfWeek) {
        case 0:
            week = 'Domingo'
            break;
        case 1:
            week = 'Segunda'
            break;
        case 2:
            week = 'Terça'
            break;
        case 3:
            week = 'Quarta'
            break;
        case 4:
            week = 'Quinta'
            break;
        case 5:
            week = 'Sexta'
            break;
        case 6:
            week = 'Sábado'
            break;
        default:
            alert('Dia da semana falhou em carregar!')
            break;
    }

    useEffect(() => {
        document.body.style.backgroundColor = "#E5E5E5";
        axios.get(`${BASE_URL}/habits/today`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                console.log(res.data)
                setHabits(res.data)
                setStartPage(true)
            })
            .catch(err => {
                console.log(err.response.data.message)
            })

    }, [])

    if (startPage === false) {
        return <LoadingPage />
    }

    if (habits.length === 0) {
        return (
            <>
                <Header />
                <PagesBackground>
                    <StyledNewHabit>
                        <h1>{week}, {dayOfMonth}/{monthOfYear}</h1>
                        <h2>Nenhum hábito concluído ainda</h2>
                    </StyledNewHabit>
                    <StyledText>
                        <h1>
                            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                        </h1>
                    </StyledText>
                </PagesBackground>
                <Footer />
            </>
        )
    } else {
        return (
            <>
                <Header />
                <PagesBackground>
                    <StyledNewHabit>
                        <h1>{week}, {dayOfMonth}/{monthOfYear}</h1>
                        <h2>Nenhum hábito concluído ainda</h2>
                    </StyledNewHabit>
                    <StyledText>
                        {habits.map((e) => <TodayHabit
                            key={e.id}
                            id={e.id}
                            name={e.name}
                            currentSequence={e.currentSequence}
                            highestSequence={e.highestSequence}
                        />)}
                    </StyledText>
                </PagesBackground>
                <Footer />
            </>
        )
    }
}

const StyledNewHabit = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    h2{
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #BABABA;
    }
    button{
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 35px;
        font-family: 'Lexend Deca';
        font-size: 26.976px;
        color: #FFFFFF;
    }
`

const StyledText = styled.div`
    margin-top: 28px;
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`