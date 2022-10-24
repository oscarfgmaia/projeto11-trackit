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
    const { user, setUser } = useContext(LoginContext);
    const dayOfWeek = dayjs().day()
    const dayOfMonth = dayjs().date()
    const monthOfYear = dayjs().month() + 1 // months goes from 0 to 11
    const [todayHabits, setTodayHabits] = useState([])
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
                setTodayHabits(res.data);
                checkProgress(res.data)
                setStartPage(true);
            })
            .catch(err => {
                alert(err.response.data.message)
            })
    }, [user.change])


    function checkProgress(arr) {
        const arrSize = arr.length
        const arrFiltered = arr.filter((e) => { if (e.done === true) return true })
        let progress = (arrFiltered.length / arrSize * 100).toFixed()
        const newUser = { ...user, progress: progress }
        setUser(newUser);
    }

    if (startPage === false) {
        return <LoadingPage />
    }

    if (todayHabits.length === 0) {
        return (
            <>
                <Header />
                <PagesBackground>
                    <StyledNewHabit>
                        <h1>{week}, {dayOfMonth}/{monthOfYear}</h1>
                        <h3>Nenhum hábito concluído ainda</h3>
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
                        {todayHabits.some(elem => elem.done === true) ? <h2>{user.progress}% dos hábitos concluídos</h2> : <h3> Nenhum hábito concluído ainda</h3>}
                    </StyledNewHabit>
                    <StyledText>
                        {todayHabits.map((e) => <TodayHabit
                            key={e.id}
                            id={e.id}
                            name={e.name}
                            done={e.done}
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
        color: #8FC549;
    }
    h3{
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #BABABA;
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