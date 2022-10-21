import { Link } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../Contexts/LoginContext";
import 'react-circular-progressbar/dist/styles.css';
export default function Footer() {
    const { user } = useContext(LoginContext)
    const [percentage, setPercentage] = useState(0)
    useEffect(() => {
        console.log(user)
        setPercentage(user.progress)
    }, [user])

    return (
        <StyledFooter>
            <Link to={'/habitos'}>
                <HabitContainer>
                    <h1>Hábitos</h1>
                </HabitContainer>
            </Link>
            <Link to={'/hoje'}>
                <CircularProgressContainer>
                    <CircularProgressbarWithChildren
                        value={percentage}
                        text={'Hoje'}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    />
                </CircularProgressContainer>
            </Link>
            <Link to={'/historico'}>
                <HistoricContainer>
                    <h1>Histórico</h1>
                </HistoricContainer>
            </Link>
        </StyledFooter>
    )
}


const HabitContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 70px;
    width: 80px;
    h1{
        background-color: #FFF;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color:#52B6FF;
    }
`

const HistoricContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 70px;
    width: 80px;
    h1{
        background-color: #FFF;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color:#52B6FF;
    }
`

const CircularProgressContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 91px;
    height: 91px;
    display: flex;
    margin-bottom: 10px;
`

const StyledFooter = styled.div`
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 70px;
    background: #FFF;
    a{
      text-decoration:none ;
    }

    img{
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }
    padding-right:36px;
    padding-left:36px;
    width: 100%;
`