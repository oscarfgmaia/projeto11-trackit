import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import logo from "../assets/imgs/logo.png"
import { ThreeDots } from 'react-loader-spinner'
import { useContext, useEffect, useState } from "react"
import { BASE_URL } from "../constants/urls"
import axios from "axios"
import { LoginContext } from "../Contexts/LoginContext"

export default function LoginPage() {
    const navigate = useNavigate()
    const [disabledSwitch, setDisabledSwitch] = useState(false);
    const [notDisabledSwitch, setNotDisabledSwitch] = useState(true);
    const [form, setForm] = useState({ email: '', password: '' })
    const { user, setUser } = useContext(LoginContext);

    function login(e) {
        e.preventDefault();
        setDisabledSwitch(true)
        setNotDisabledSwitch(false)

        axios.post(`${BASE_URL}/auth/login`, form)
            .then(res => {
                setDisabledSwitch(false)
                setNotDisabledSwitch(true)
                const newUser = res.data
                newUser.token = res.data.token
                newUser.image = res.data.image
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("image", res.data.image)
                setUser(newUser);
                navigate('/hoje')
            })
            .catch(err => {
                alert(err.response.data.message)
                setDisabledSwitch(false)
                setNotDisabledSwitch(true)
            })
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        document.body.style.backgroundColor = "white";
        if (localStorage.getItem('token')) {
            const newUser = { ...user }
            newUser.token = localStorage.getItem('token')
            newUser.image = localStorage.getItem('image')
            setUser(newUser)
            navigate('/hoje')
        }
    }, [])

    return (
        <LoginContainer disable={disabledSwitch}>
            <img src={logo} alt="Logo" />
            <form onSubmit={login}>
                <input data-identifier="input-email" name="email" value={form.email} onChange={handleChange} type="email" placeholder="email" required disabled={disabledSwitch} />
                <input data-identifier="input-password" name="password" value={form.password} onChange={handleChange} type="password" placeholder="senha" required disabled={disabledSwitch} />
                <button data-identifier="login-btn" disabled={disabledSwitch} type="submit">
                    <StyledButtonText visible={notDisabledSwitch}>
                        Entrar
                    </StyledButtonText>
                    <ThreeDots color="white" visible={disabledSwitch} />
                </button>
            </form>
            <Link to={"/cadastro"}><span data-identifier="sign-up-action">Não tem uma conta? Cadastre-se</span></Link>
        </LoginContainer>
    )

}

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img{
        margin-top: 68px;
        margin-bottom: 32px;
        width: 180px;

    }
    input{
        filter:brightness(${props => props.disable ? 0.95 : 1});
        margin-bottom:6px;
    }
    button{
        filter:brightness(${props => props.disable ? 0.95 : 1});
        margin-bottom: 25px;
        width: 303px;
        height: 45px;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
    }
    span{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
    form{
        display: flex;
        flex-direction: column;
    }
    `

const StyledButtonText = styled.h1`
    display: ${props => props.visible ? 'contents' : 'none'};
`