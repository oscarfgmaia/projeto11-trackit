import Footer from "../components/Footer";
import Header from "../components/Header";
import PagesBackground from "../assets/css/PagesBackground"
import styled from "styled-components";
import axios from "axios";
import { BASE_URL } from "../constants/urls";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../Contexts/LoginContext";
import CreateHabit from "../components/CreateHabit";
import LoadingPage from "../components/LoadingPage";
import Habit from "../components/Habit";


export default function HabitsPage({}) {
    const [start, setStart] = useState(false)
    const [createHabitBtn, setCreateHabitBtn] = useState(false)
    const { user, setUser } = useContext(LoginContext);
    const [habits, setHabits] = useState([])
    const [form, setForm] = useState({ name: '', days: [] })
    const [days, setDays] = useState([
        { value: 0, day: 'D', clicked: false },
        { value: 1, day: 'S', clicked: false },
        { value: 2, day: 'T', clicked: false },
        { value: 3, day: 'Q', clicked: false },
        { value: 4, day: 'Q', clicked: false },
        { value: 5, day: 'S', clicked: false },
        { value: 6, day: 'S', clicked: false },
    ]);
    useEffect(() => {
        axios.get(`${BASE_URL}/habits`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                setStart(true);
                setHabits(res.data)
                const newUser = {...user}
                user.allHabits = res.data.length;
                setUser(user)
            })
            .catch(err => {
                alert(err.response.data)
            })
    }, [user.change])


    if (start === false) {
        return <LoadingPage />
    }

    function createHabit() {
        setCreateHabitBtn(!createHabitBtn)
    }

    if (user.allHabits === 0) {
        return (
            <>
                <Header />
                <PagesBackground>
                    <StyledNewHabit>
                        <h1>Meus Hábitos</h1>
                        <button onClick={createHabit}>+</button>
                        
                    </StyledNewHabit>
                    {createHabitBtn && <CreateHabit setCreateHabitBtn={setCreateHabitBtn} form={form} setForm={setForm} days={days} setDays={setDays}/>}
                    <StyledText>
                        <h1>
                            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                        </h1>
                    </StyledText>
                </PagesBackground>
                <Footer />
            </>
        )
    }
    else {
        return (
            <>
                <Header />
                <PagesBackground>
                    <StyledNewHabit>
                        <h1>Meus Hábitos</h1>
                        <button onClick={createHabit}>+</button>
                    </StyledNewHabit>
                    {createHabitBtn && <CreateHabit setCreateHabitBtn={setCreateHabitBtn} form={form} setForm={setForm} days={days} setDays={setDays}/>}

                    <StyledText>
                        {habits.map((e) =>
                            <Habit
                                key={e.id}
                                id={e.id}
                                name={e.name}
                                days={e.days}
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
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
        align-items: flex-start;
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