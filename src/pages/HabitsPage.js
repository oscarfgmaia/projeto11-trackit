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
import { AllHabitsContext } from "../Contexts/AllHabitsContext";



export default function HabitsPage({}) {
    const [start, setStart] = useState(false)
    const [createHabitBtn, setCreateHabitBtn] = useState(false)
    const { user, setUser } = useContext(LoginContext);
    const {allHabits, setAllHabits} = useContext(AllHabitsContext)
    const [habits, setHabits] = useState([])

    useEffect(() => {
        console.log("DENTRO DO HABITS PAGE")
        axios.get(`${BASE_URL}/habits`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                setStart(true);
                setHabits(res.data)
                setUser({...user,change:!user.change})
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }, [createHabitBtn])


    if (start === false) {
        return <LoadingPage />
    }

    function createHabit() {
        setCreateHabitBtn(!createHabitBtn)
    }

    if (allHabits.length === 0) {
        return (
            <>
                <Header />
                <PagesBackground>
                    <StyledNewHabit>
                        <h1>Meus Hábitos</h1>
                        <button onClick={createHabit}>+</button>
                        
                    </StyledNewHabit>
                    {createHabitBtn && <CreateHabit setCreateHabitBtn={setCreateHabitBtn}/>}
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
                    {createHabitBtn && <CreateHabit setCreateHabitBtn={setCreateHabitBtn} />}
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