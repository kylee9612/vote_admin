function Delete({deleteHandler}) {

    return (
        <div className={"delete-icon"} onClick={deleteHandler}>
            <span className="material-symbols-outlined">close</span>
        </div>
    )
}

export default Delete