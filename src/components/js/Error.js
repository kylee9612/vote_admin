import '../css/error.css'

function Error(props) {
    const backToHome = ()=>{
        props.prop.navigate("/")
    }

    return (
        <>
            <div className={'page-error'}>
                <h1>404 Page Not Found</h1>
            </div>
            <div className={'page-redirect'}>
                <h1 onClick={backToHome}>HOME</h1>
            </div>
        </>
    )
}

export default Error