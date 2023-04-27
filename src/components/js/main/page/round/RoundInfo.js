import "./RoundInfo.css"
import DatePicker from "react-datepicker";

function RoundInfo({data, index, clickEvent}) {
    const progress = () => {
        const today = new Date();
        if (today < new Date(data.startDate))
            return "upcoming"
        else if (today > new Date(data.endDate))
            return "finished"
        else
            return "ongoing"
    }
    return (
        <div className={"round-info"} onClick={clickEvent}>
            <div className={"round-info-inner"}>
                <div className={"progress " + progress()}>{progress()}</div>
                <h2>{index + 1}회차</h2>
                <h3>{data.title}</h3>
                <div className={"round-info-date"}>
                    <DatePicker
                        className={"round-info-datepicker"}
                        selected={new Date(data.startDate)}
                        disabled/>
                    <div>~</div>
                    <DatePicker
                        className={"round-info-datepicker"}
                        selected={new Date(data.endDate)}
                        disabled/>
                </div>
                <div dangerouslySetInnerHTML={{__html: data.content}}></div>
            </div>
        </div>
    )
}

export default RoundInfo;