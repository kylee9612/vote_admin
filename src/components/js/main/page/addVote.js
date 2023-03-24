import Calendar from "./box/Calendar";

function AddVote() {

    return (
        <>
            <form>
                <input type={"text"} placeholder={"제목"}/>
                <Calendar />
                <input type={"date"} placeholder={"투표 종료일"}/>
            </form>
        </>
    )
}

export default AddVote