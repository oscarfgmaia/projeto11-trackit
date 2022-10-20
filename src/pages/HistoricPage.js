import axios from "axios";
import { useContext } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { LoginContext } from "../Contexts/LoginContext";
import { BASE_URL } from "../constants/urls"
export default function HistoricPage() {
    return (
        <>
            <Header />
            <Footer />
        </>
    )
}