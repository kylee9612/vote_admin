import "./Page.css"
import {Outlet} from "react-router-dom";
function Page() {
    return (
        <div className={'page'}>
            <div className={'page-content'}>
                <Outlet/>
            </div>
        </div>
    )
}

export default Page