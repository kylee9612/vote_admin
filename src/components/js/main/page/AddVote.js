function AddVote() {

    return (
        <>
            <form>
                <input type={"text"} placeholder={"제목"}/>
                <input type={"date"} placeholder={"투표 시작일"}/>
                <input type={"date"} placeholder={"투표 종료일"}/>
            </form>
        </>
    )
}

export default AddVote