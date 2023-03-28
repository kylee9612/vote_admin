import './Header.css'

function Header({navigate, location}) {
    const logout = () => {
        navigate("/")
    }

    return (
        <div className={"header"}>
            {location.pathname === "/" ?
                "" :
                <span className={'logout-logo'} onClick={logout}>LOGOUT</span>
            }
        </div>
    )
}

export default Header