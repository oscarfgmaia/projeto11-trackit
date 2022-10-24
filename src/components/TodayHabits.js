import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import checkBox from "../assets/imgs/checkbox.svg"
import { BASE_URL } from "../constants/urls"
import { LoginContext } from "../Contexts/LoginContext"

export default function TodayHabit({ name, currentSequence, highestSequence, id, done }) {
    const { user, setUser } = useContext(LoginContext);

    function onClick() {
        if (done) {
            axios.post(`${BASE_URL}/habits/${id}/uncheck`, {}, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then(res => {
                    const newUser = { ...user }
                    newUser.change = !newUser.change
                    setUser(newUser)
                })
                .catch(err => {
                    alert(err.response.data.message)
                })
        } 
        else {
            axios.post(`${BASE_URL}/habits/${id}/check`, {}, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then(res => {
                    const newUser = { ...user }
                    newUser.change = !newUser.change
                    setUser(newUser)
                })
                .catch(err => {
                    alert(err.response.data.message)
                })
        }
    }



    return (
        <StyledContainer>
            <StyledLeft isEqual={currentSequence === highestSequence} done={done} highestSequence={highestSequence}>
                <h1>{name}</h1>
                <h2>Sequência atual: <StyledActualDay>{currentSequence} dias</StyledActualDay></h2>
                <h2>Seu recorde: <StyledRecordDay>{highestSequence} dias</StyledRecordDay></h2>
            </StyledLeft>
            <StyledRight>
                <StyledCheckBox done={done} src={checkBox} onClick={onClick} />
            </StyledRight>
        </StyledContainer>
    )
}

const StyledActualDay = styled.span`
    color:red;
`
const StyledRecordDay = styled.span`
    color:red;
`

const StyledCheckBox = styled.img`
    filter: ${props => props.done === true ? (
        `
            invert(69%) 
            sepia(40%) 
            saturate(597%) 
            hue-rotate(44deg) 
            brightness(97%) 
            contrast(87%);
        `
    ) : (
        `
            invert(100%)
            sepia(1%)
            saturate(10%)
            hue-rotate(161deg)
            brightness(115%)
            contrast(81%);
        `
    )}
`

const StyledLeft = styled.div`
        display: flex ;
        flex-direction: column;
        align-items: flex-start;
    h1{
        margin-bottom: 5px;
        font-size: 20px;
        color: #666666;
    }
    h2{
        margin-bottom: 2px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
    }

    ${StyledActualDay}{
        color: ${props => props.done ? '#8FC549' : '#666666'} ;
    }
    ${StyledRecordDay}{
        color: ${props => props.isEqual && props.highestSequence !== 0 ? '#8FC549' : '#666666'} ;
    }

`
const StyledRight = styled.div`
    button{
        width: 69px;
        height: 69px;
    }
`
const StyledContainer = styled.div`
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px;
    background-color: #FFF;
    width: 100%;
    height: 94px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`