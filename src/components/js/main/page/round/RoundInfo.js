import "./RoundInfo.css"
import DatePicker from "react-datepicker";

function RoundInfo({data, index}) {
    return (
        <div className={"round-info"}>
            <div className={"round-info-inner"}>
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