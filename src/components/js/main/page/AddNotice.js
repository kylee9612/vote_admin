import "./AddNotice.css"

function AddNotice(){
    return(
        <>
            <h1>공지 추가</h1>
            <form className={"notice-form"}>
                <input type={"text"} placeholder={"제목"}/>
                {/*<input title={"password"} placeholder={"비밀번호"}/>*/}
                <button type={"submit"}>공지사항 추가</button>
            </form>
        </>
    )
}

export default AddNotice