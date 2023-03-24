import "../../../css/main/page/admin.css"

function admin() {
    const moveButton =(event) =>{
        let page = document.querySelector(".page-content")
        let pageWidth = page.clientWidth
        let pageHeight = page.clientHeight
        let ranX = Math.random() * pageWidth
        let ranY = Math.random() * pageHeight
        let btn = document.getElementById('idiotBtn')
        btn.style.position = 'absolute'
        btn.style.top = ranY+"px"
        btn.style.left = ranX+"px"
    }

    const changeTitle = () => {
        let title = document.querySelector(".title")
        title.textContent = "그럴줄 알았다 :)"
    }

    return (
        <div className={'fun'}>
            <h1 className={'title'}>혹시... 바보이신가요 ??</h1>
            <button onClick={changeTitle}>네 저는 바보입니다</button>
            <button id={'idiotBtn'} onMouseEnter={moveButton}>아니요</button>
        </div>
    )
}

export default admin