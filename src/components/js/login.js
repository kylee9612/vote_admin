import '../css/login.css'
import {useState} from "react";

function Login(props){
    const [idValue, setId] = useState("")
    const [pwValue, setPw] = useState("")

    const changeId = (event) =>{
        setId(event.target.value)
    }

    const changePw = (event) =>{
        setPw(event.target.value)
    }

    const loginBtn = ((event)=>{
        event.preventDefault()
        props.btnLogin()
    })

    return(
        <div id={'login'}>
            <div className={'login box'}>
                <span className={'center_span'}>관리자 페이지</span>
                <input id={'id'} type={'text'} placeholder={"조합 번호"} onChange={changeId}/>
                <input id={'password'} type={'password'} placeholder={"password"} onChange={changePw}/>
                <button className={'btn'} onClick={loginBtn}>로그인</button>
            </div>
        </div>
    )
}

export default Login;