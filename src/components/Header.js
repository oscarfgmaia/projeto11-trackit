import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginContext } from "../Contexts/LoginContext";

export default function Header(){
    const {user} = useContext(LoginContext)
    const navigate = useNavigate()
    function logout(){
        if(window.confirm("Você têm certeza que quer deslogar?")){
            localStorage.clear()
            navigate('/')
        }
    }
    return(
        <StyledHeader>
            <h1 onClick={logout}>TrackIt</h1>
            <img data-identifier="avatar" src={`${user.image}`} alt="Profile Pic"/>
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
    position: fixed;
    z-index: 999;
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