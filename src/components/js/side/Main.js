import "./Main.css"
import "../../../App.css"
import Menu from "../main/fixed/Menu"
import Page from "../main/fixed/Page";
import {CSSTransition} from "react-transition-group";

function Main(props) {
    const location = props.prop.location
    return (
        <>
            <Menu prop={props.prop}/>
            <CSSTransition key={location.pathname} timeout={500} classNames={"slide"}>
                <Page prop={props.prop}/>
            </CSSTransition>
        </>
    )
}

export default Main;