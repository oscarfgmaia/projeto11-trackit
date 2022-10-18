import logo from "../assets/imgs/logo.png"
export default function LoginPage(){
    return(
        <>
            <img src={logo} alt="Logo"/>
            <input type="text" id="lname" name="lname"/>
        </>
    )
}