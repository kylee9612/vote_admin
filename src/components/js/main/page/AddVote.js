import "./AddVote.css"

function AddVote() {

    return (
        <>
            <h1>투표 추가</h1>
            <form className={"vote-form"}>
                <input type={"text"} placeholder={"제목"}/>
                <input type={"date"} placeholder={"투표 시작일"}/>
                <input type={"date"} placeholder={"투표 종료일"}/>
                <button type={"submit"}>투표 추가</button>
            </form>
        </>
    )
}

export default AddVote