import "./AddAdmin.css";
import React, {useEffect, useImperativeHandle, useState} from "react";
import axios from "axios";

function EditAdmin(props, ref) {
    const {mode, admin , handleSubmit} = props;
    const defaultAdmin = {
        ad_idx: "",
        ad_id: "",
        ad_pw: "",
        ad_name: "",
        ad_level: "",
    }
    const [currentAdmin, setCurrentAdmin] = useState(admin || defaultAdmin);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentAdmin((prevAdmin) => ({ ...prevAdmin, [name]: value }));
    };
    return (
        <form className={"admin-form"} id={"admin-form"} onSubmit={handleSubmit}>
            <table>
                <tbody>
                <input type={"hidden"} name={"ad_idx"} value={currentAdmin.ad_idx}/>
                <tr>
                    <th>ID:</th>
                    <td><input type="text" name="ad_id" value={currentAdmin.ad_id} onChange={handleInputChange}/></td>
                </tr>
                <tr>
                    <th>Password:</th>
                    <td><input type="password" name="ad_pw" value={currentAdmin.ad_pw} onChange={handleInputChange}/></td>
                </tr>
                <tr>
                    <th>Name:</th>
                    <td><input type="text" name="ad_name" value={currentAdmin.ad_name} onChange={handleInputChange}/></td>
                </tr>
                <tr>
                    <th>Level:</th>
                    <td><input type="text" name="ad_level" value={currentAdmin.ad_level} onChange={handleInputChange}/></td>
                </tr>
                </tbody>
            </table>
        </form>
    );
}

export default EditAdmin;