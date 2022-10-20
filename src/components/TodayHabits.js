import styled from "styled-components"
import checkBox from "../assets/imgs/checkbox.svg"

export default function TodayHabit({ name, currentSequence,highestSequence }) {

    return (
        <StyledContainer>
            <StyledLeft>
                <h1>{name}</h1>
                <h2>Sequência atual: {currentSequence} dias</h2>
                <h2>Seu recorde: {highestSequence} dias</h2>
            </StyledLeft>
            <StyledRight>
                <img src={checkBox}></img>
            </StyledRight>
        </StyledContainer>
    )
}

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
img{
    filter: 
    invert(100%)
    sepia(1%)
    saturate(10%)
    hue-rotate(161deg)
    brightness(115%)
    contrast(81%);
/*
    filter: 
    invert(69%) 
    sepia(40%) 
    saturate(597%) 
    hue-rotate(44deg) 
    brightness(97%) 
    contrast(87%);*/
}
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