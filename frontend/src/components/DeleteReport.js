
import axios from "axios";
import { useParams } from "react-router-dom";




export default function DeleteReport() {

    const { id } = useParams();
    function getReports() {
        axios.delete("http://localhost:8050/report/delete/" + id).then(function () {
            alert(" data deleted")
            window.location = "/labAllReports";
        }).catch((err) => {
            alert(err)
        })

    }

    getReports()

    return (
        <h1></h1>
    )

}

