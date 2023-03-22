import "../css/menu.css"

function Menu(){
    return(
        <nav className={'left-nav'}>
            <ul className={'menu'}>
                <li>투표 추가</li>
                <li>코인 추가</li>
                <li>투표 결과 조회</li>
                <li>공지 사항</li>
            </ul>
        </nav>
    )
}

export default Menu