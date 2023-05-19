import axios from "axios";
import { useParams } from "react-router-dom";

export default function DeleteItem() {

    const { id } = useParams();
    function getItems() {
        axios.delete("http://localhost:8050/labitemsinventory/deleteItem/" + id).then(function () {
            //alert(" data deleted")
            window.location = "/item";
        }).catch((err) => {
            alert(err)
        })

    }

    getItems()

    return (
        <center><div class="alert alert-success" role="alert">
            This is a success alert—check it out!
        </div></center>
    )

}

