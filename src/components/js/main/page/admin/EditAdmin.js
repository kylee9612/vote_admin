import "./AddAdmin.css";
import React, {useEffect, useState} from "react";
import axios from "axios";

function EditAdmin(props) {
    const {mode, ad_idx, toggleModal} = props;
    const [admin, setAdmin] = useState({
        ad_id: "",
        ad_pw: "",
        ad_name: "",
        ad_level: ""
    });

    useEffect(() => {
        if (mode === "edit") {
            const url = "/api/admin/getAdmin";
            axios.post(url, {ad_idx: ad_idx})
                .then((res) => {
                    setAdmin(res.data.data);
                })
                .catch((error) => {
                    alert('error' + error);
                })
        }
    }, [mode, ad_idx]);

    const handleChange = (e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = mode === "edit" ? "/api/admin/editAdmin" : "/api/admin/addAdmin";
        axios.post(url, admin)
            .then((res) => {
                alert("Success");
                toggleModal();
                window.location.reload();
            })
            .catch((error) => {
                alert('error' + error);
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                <tr>
                    <th>ID:</th>
                    <td><input type="text" name="ad_id" value={admin.ad_id} onChange={handleChange}/></td>
                </tr>
                <tr>
                    <th>Password:</th>
                    <td><input type="password" name="ad_pw" value={admin.ad_pw} onChange={handleChange}/></td>
                </tr>
                <tr>
                    <th>Name:</th>
                    <td><input type="text" name="ad_name" value={admin.ad_name} onChange={handleChange}/></td>
                </tr>
                <tr>
                    <th>Level:</th>
                    <td><input type="text" name="ad_level" value={admin.ad_level} onChange={handleChange}/></td>
                </tr>
                </tbody>
            </table>
            <button type="submit">Save</button>
        </form>
    )
}

export default EditAdmin;