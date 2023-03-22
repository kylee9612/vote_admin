import './App.css';
import Login from "./components/js/login";
import Main from "./components/js/Main"
import {useEffect, useState} from "react";

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

    const btnLogin = (()=>{
        setLogin(true)
    })

    return (
        <div id={'wrap'}>
            {isLogin ?
                <Main/> :
                <Login btnLogin={btnLogin}/>
            }
        </div>
    );
}

export default App;
