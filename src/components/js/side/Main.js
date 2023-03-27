import "./Main.css"
import Menu from "../main/fixed/Menu"
import Page from "../main/fixed/Page";

function Main(props){
    return(
        <>
            <Menu prop={props.prop}/>
            <Page prop={props.prop}/>
        </>
    )
}

export default Main;