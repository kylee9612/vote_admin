import './App.css';
import Login from "./components/js/login";
import Main from "./components/js/Main"
import {useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Header from "./components/js/Header";
import AddCoin from "./components/js/main/page/addCoin";
import AddVote from "./components/js/main/page/addVote";
import AddNotice from "./components/js/main/page/addNotice";
import AddAdmin from "./components/js/main/page/addAdmin";
import VoteResult from "./components/js/main/page/voteResult";
import Error from "./components/js/Error";
import Admin from "./components/js/main/page/admin";

function App() {

    const [isLogin, setLogin] = useState(false)

    useEffect(() => {
        let user = sessionStorage.getItem("userId")
        if (user == null) {
            setLogin(false)
        } else {
            setLogin(true)
        }
    }, [])

    const navigate = useNavigate()
    const location = useLocation();
    const btnLogin = () => {
        navigate("/main")
    }

    const prop = {
        navigate: navigate,
        location: location
    }

    return (
        <div id={'wrap'}>
            <TransitionGroup className={"transition-group"}>
                <Header/>
                <CSSTransition key={location.pathname} timeout={500} classNames={"slide"}>
                    <Routes location={location}>
                        <Route path="/" element={<Login btnLogin={btnLogin}/>}></Route>
                        <Route path="/main" element={<Main prop={prop}/>}>
                            <Route path="" element={<Admin prop={prop}/>}></Route>
                            <Route path="addVote" element={<AddVote prop={prop}/>}></Route>
                            <Route path="addCoin" element={<AddCoin prop={prop}/>}></Route>
                            <Route path="addNotice" element={<AddNotice prop={prop}/>}></Route>
                            <Route path="addAdmin" element={<AddAdmin prop={prop}/>}></Route>
                            <Route path="voteResult" element={<VoteResult prop={prop}/>}></Route>
                        </Route>
                        <Route path={"*"} element={<Error prop={prop}/>}></Route>
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default App;
