import "./Main.css"
import "../../../App.css"
import Menu from "../main/fixed/Menu"
import Page from "../main/fixed/Page";
import {CSSTransition} from "react-transition-group";

function Main(props) {
    const location = props.prop.location
    return (
        <>
            <Page prop={props.prop}/>
        </>
    )
}

export default Main;