import "../css/main.css"
import Menu from "./main/Menu"
import Page from "./main/Page";

function Main(props){
    return(
        <>
            <Menu prop={props.prop}/>
            <Page prop={props.prop}/>
        </>
    )
}

export default Main;