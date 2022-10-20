import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components"

export default function LoadingPage(){
    return(
        <EntirePage>
            <ThreeDots color="#52B6FF"/>
        </EntirePage>
    )
    
}
/*
<ThreeDots
    height="80"
    width="80"
    radius="9"
    color="#4fa94d"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={true}
/>
*/
const EntirePage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

