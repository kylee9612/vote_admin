import "./Menu.css"

function Menu({navigate}) {

    const navList = ['/main/addVote', '/main/addCoin', '/main/voteResult', '/main/addAdmin', '/main/addNotice']

    const navigateTo = (event) => {
        event.preventDefault()
        let value
        if (event.target.tagName === "H1")
            value = "/main"
        else if (event.target.parentElement.tagName === 'LI')
            value = navList[event.target.parentElement.value]
        else
            value = navList[event.target.value]
        navigate(value)
    }

    return (
        <nav className={'left-menu'}>
            <div className={"logo"}>
                <h1 onClick={navigateTo}>VOTE</h1>
            </div>
            <ul className={'menu'}>
                <li onClick={navigateTo} value={0}><span>투표 추가</span></li>
                <li onClick={navigateTo} value={1}><span>코인 추가</span></li>
                <li onClick={navigateTo} value={2}><span>투표 결과 조회</span></li>
                <li onClick={navigateTo} value={3}><span>조합원 추가</span></li>
                <li onClick={navigateTo} value={4}><span>공지 사항</span></li>
            </ul>
        </nav>
    )
}

export default Menu