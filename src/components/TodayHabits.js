import axios from "axios"
import { useContext, useState } from "react"
import styled from "styled-components"
import checkBox from "../assets/imgs/checkbox.svg"
import { BASE_URL } from "../constants/urls"
import { LoginContext } from "../Contexts/LoginContext"

export default function TodayHabit({ name, currentSequence, highestSequence, id, done, handleEffect, setHandleEffect }) {
    const { user } = useContext(LoginContext);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTk2OSwiaWF0IjoxNjY2MjA1MTkzfQ.LRHldZEEV5qM_kSKl4wcLBcGhJwAIiIHwWW_dPVke7s"

    function onClick() {
        axios.post(`${BASE_URL}/habits/${id}/check`,{},{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setHandleEffect(!handleEffect)
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
    }

    return (
        <StyledContainer>
            <StyledLeft>
                <h1>{name}</h1>
                <h2>Sequência atual: {currentSequence} dias</h2>
                <h2>Seu recorde: {highestSequence} dias</h2>
            </StyledLeft>
            <StyledRight>
                <StyledCheckBox done={done} src={checkBox} onClick={onClick} />
            </StyledRight>
        </StyledContainer>
    )
}

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
        font-size: 13px;
        color: #666666;
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