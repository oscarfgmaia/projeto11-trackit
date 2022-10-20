import Footer from "../components/Footer";
import Header from "../components/Header";
import PagesBackground from "../assets/css/PagesBackground"
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { LoginContext } from "../Contexts/LoginContext";

export default function TodayPage() {
    const {user} = useContext(LoginContext);

    return (
        <>
            <Header />
            <PagesBackground>
                <StyledNewHabit>
                    <h1>Meus Hábitos</h1>
                    <button>+</button>
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
}

const StyledNewHabit = styled.div`
    display: flex;
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