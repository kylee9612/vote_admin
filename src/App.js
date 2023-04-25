import './App.css';
import Login from "./components/js/side/Login";
import Main from "./components/js/side/Main"
import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Header from "./components/js/side/Header";
import AddCoin from "./components/js/main/page/coin/AddCoin";
import AddVote from "./components/js/main/page/vote/AddVote";
import AddNotice from "./components/js/main/page/notice/AddNotice";
import AddAdmin from "./components/js/main/page/admin/AddAdmin";
import VoteResult from "./components/js/main/page/vote/VoteResult";
import Error from "./components/js/side/Error";
import Admin from "./components/js/main/page/admin/Admin";
import EditNotice from "./components/js/main/page/notice/EditNotice";
import Menu from "./components/js/main/fixed/Menu";
import RoundList from "./components/js/main/page/round/RoundList";

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
            <Header navigate={navigate} location={location}/>
            {location.pathname === "/" ? <></> : <Menu navigate={navigate}/>}
            <TransitionGroup className={"transition-group"}>
                <CSSTransition key={location.pathname} timeout={500} classNames={"slide"}>
                    <Routes location={location}>
                        <Route path="/" element={<Login btnLogin={btnLogin}/>}></Route>
                        <Route path="/main" element={<Main prop={prop}/>}>
                            <Route path="" element={<Admin prop={prop}/>}></Route>
                            <Route path={"vote"}>
                                <Route path="" element={<AddVote prop={prop}/>}></Route>
                                <Route path="lists" element={<RoundList prop={prop}/>}></Route>
                                <Route path="results" element={<VoteResult prop={prop}/>}></Route>
                            </Route>
                            <Route path="coins" element={<AddCoin prop={prop}/>}></Route>
                            <Route path="notice" element={<AddNotice prop={prop}/>}></Route>
                            <Route path="admin" element={<AddAdmin prop={prop}/>}></Route>
                            <Route path="notice/:id" element={<EditNotice prop={prop}/>}></Route>
                        </Route>
                        <Route path={"*"} element={<Error prop={prop}/>}></Route>
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default App;
