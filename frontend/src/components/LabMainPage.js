import axios from "axios";
import Mainback4 from "../reportImages/back4.jpg";
import labInventory3 from "../reportImages/labInventory3.avif";
import labInventory2 from "../reportImages/labInventory2.avif";
import labInventory1 from "../reportImages/labInventory1.avif";
import inventoryimg from "../reportImages/inventoryimg.avif";
export default function SearchReports() {



    return (

        <div
            style={{

                backgroundImage: `url(${Mainback4})`,
                //backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                //background-size: cover;
                backgroundPosition: 'center',
                maxWidth: '100%',
                opacity: '0.8'
            }}>
            <div><br></br><br></br><br></br>

                <center>
                    <table>
                        <tr className="rounded-left">
                            <td className="col-md-6 "><div className="card-1" style={{ width: '350px' }}>
                                <img src={labInventory3} class=" card-img-top" alt="Fissure in Sandstone" />
                                <div class="card-body">
                                    <h5 class="card-title">Add Lab Reports</h5>
                                    <p class="card-text">Create lab reports like blood reports and X-rays..</p>
                                    <div class="dropdown">
                                        <button class="btn dropdown-toggle" style={{ backgroundColor: '#26CDD1', color: 'white' }} type="button" data-toggle="dropdown">Choose Report Type
                                            <span class="caret"></span></button>
                                        <ul class="dropdown-menu" style={{ color: '#2F4FAA' }}>
                                            <li><a href="/addBlood">Blood Reports</a></li>
                                            <li><a href="/add">X-ray Reports</a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            </td>

                            <td className="col-md-6 "><div className="card-1" style={{ width: '350px', }}>
                                <img src={labInventory2} class=" card-img-top" alt="Fissure in Sandstone" />
                                <div class="card-body">
                                    <h5 class="card-title">View Lab Reports</h5>
                                    <p class="card-text">View All the type of lab reports like blood reports and X-rays..</p>
                                    <div class="dropdown">
                                        <button class="btn dropdown-toggle" style={{ backgroundColor: '#26CDD1', color: 'white' }} type="button" data-toggle="dropdown">Choose Report Type
                                            <span class="caret"></span></button>
                                        <ul class="dropdown-menu" style={{ color: '#2F4FAA' }}>
                                            <li><a href="/blood">Blood Reports</a></li>
                                            <li><a href="/labAllReports">X-ray Reports</a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            </td>


                        </tr>


                        <tr className="rounded-left">

                            <td className="col-md-6"><div className="card-1" style={{ width: '350px' }}>
                                <img src={labInventory1} class="card-img-top" alt="Fissure in Sandstone" />
                                <div class="card-body">
                                    <h5 class="card-title">Add Inventory of Laboratory Items</h5>
                                    <p class="card-text">Add items to the sub-inventory part of laboratory items.</p>
                                    <a href="/addItem " class="btn " style={{ backgroundColor: '#26CDD1', color: 'white', width: '150px' }}>Inventory</a>
                                </div>
                            </div>
                            </td>

                            <td className="col-md-6"><div className="card-1" style={{ width: '350px' }}>
                                <img src={inventoryimg} class="card-img-top" alt="Fissure in Sandstone" />
                                <div class="card-body">
                                    <h5 class="card-title">View Inventory of Laboratory Items</h5>
                                    <p class="card-text">View and give a quick update on the sub-inventory part of laboratory items.</p>
                                    <a href="/item" class="btn " style={{ backgroundColor: '#26CDD1', color: 'white', width: '150px' }}>View Inventory</a>
                                </div>
                            </div>
                            </td>

                        </tr>
                    </table>
                </center>
            </div>
        </div>
    );
}
