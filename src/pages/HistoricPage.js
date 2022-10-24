import Footer from "../components/Footer";
import Header from "../components/Header";
import PagesBackground from "../assets/css/PagesBackground";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";

export default function HistoricPage() {
    const {user,setUser} = useContext(LoginContext)
    const navigate = useNavigate()
    useEffect(() => {
        document.body.style.backgroundColor = "#E5E5E5";
        if (localStorage.getItem('token')) {
            const newUser = {...user}
            newUser.token = localStorage.getItem('token')
            newUser.image = localStorage.getItem('image')
            setUser(newUser)
        }
        else {
            navigate('/')
        }
    }, [])

    if (localStorage.getItem('token')) {
        return (
            <>
                <Header />
                <PagesBackground>
                    <StyledNewHabit>
                        <h1>Histórico</h1>
                        <h2>
                            Em breve você poderá ver o histórico dos seus hábitos aqui!
                        </h2>
                    </StyledNewHabit>
                </PagesBackground>
                <Footer />
            </>
        )
    }

    else {
        console.log('false')
        navigate('/')
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
        margin-bottom: 17px;
    }
    h2{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;

        color: #666666;
    }
`