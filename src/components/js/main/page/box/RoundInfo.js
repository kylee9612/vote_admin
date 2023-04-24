import "./RoundInfo.css"

function RoundInfo({data, index}){

    console.log(data)
    return(
        <div className={"roundInfo"}>
            <div className={"roundInfo-inner"}>
            <h1>{index+1}회차</h1>
            <span>{data.coin_name}</span>
            </div>
        </div>
    )
}

export default RoundInfo;