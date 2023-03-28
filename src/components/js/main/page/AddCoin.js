import "./AddCoin.css"

function AddCoin(){
    return(
        <>
            <h1>코인 추가</h1>
            <form className={"coin-form"}>
                <input type={"number"} placeholder={"조합 번호"}/>
                <input type={"text"} placeholder={"성명"}/>
                <input title={"password"} placeholder={"비밀번호"}/>
                <input type={"number"} placeholder={"OTP 인증"}/>
                <button type={"submit"}>코인 추가</button>
            </form>
        </>
    )
}

export default AddCoin