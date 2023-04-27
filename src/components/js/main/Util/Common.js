import Swal from "sweetalert2";

export function parseDateFormat(source){
    const date = new Date(source);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    if(month < 10)
        month = "0"+month
    if(day < 10)
        day = "0"+day
    return year+"-"+month+"-"+day
}

export function sweetAlert(response,url){
    if(response === "error" || response.data.code === 9999){
        Swal.fire({
            icon: "error",
            showConfirmButton: "OK",
            title: "ERROR OCCURRED"
        })
    }else if(response.data.code === 0){
        Swal.fire({
            showConfirmButton: "OK",
            icon: "success",
            title: response.data.message
        }).then((result)=>{
            if(result.isConfirmed && url != null){
                window.location.href = url
            }
        })
    }
}