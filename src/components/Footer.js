import styled from "styled-components";

export default function Footer(){
    return(
        <StyledFooter>
            <h1>Hábitos</h1>
            <h1>Históricos</h1>
        </StyledFooter>
    )
}

const StyledFooter = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    background: #FFF;
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;

        color: #52B6FF;
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