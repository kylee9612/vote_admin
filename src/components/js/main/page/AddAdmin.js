function AddAdmin(props){
    const submitForm = (event)=>{
        event.preventDefault()
    }

    return(
        <>
            <h1>조합원 추가</h1>
            <form>
                <input type={"number"} placeholder={"조합 번호"}/>
                <input type={"text"} placeholder={"성명"}/>
                <input title={"password"} placeholder={"비밀번호"}/>
                <input type={"number"} placeholder={"OTP 인증"}/>
                <button type={"submit"} onClick={submitForm}>아이디 생성</button>
            </form>
        </>
    )
}

export default AddAdmin