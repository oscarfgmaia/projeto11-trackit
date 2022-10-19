import styled from "styled-components";

export default function Header(){
    return(
        <StyledHeader>
            <h1>TrackIt</h1>
            <img src="https://img.assinaja.com/upl/lojas/mundosinfinitos/imagens/foto-one-piece.png" alt="Profile Pic"/>
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    h1{
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color:#fff;
    }
    img{
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }
    padding-right:18px;
    padding-left:18px;
    width: 100%;
`