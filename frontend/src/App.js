import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ReadAppoinment from "./components/ReadAppoinment";
import DeleteAppoinment from "./components/DeleteAppoinment";
import AddAppoinment from "./components/AddAppoinment";
import UpdateAppoinment from "./components/UpdateAppoinment";
import Appoinements from "./components/Appoinments";
import AddLabAppoinment from "./components/AddLabAppoinment";
import ReadLabAppoinment from "./components/ReadLabAppoinment";
import UpdateLabAppoinment from "./components/UpdateLabAppoinment";
import DeleteLabAppoinment from "./components/DeleteLabAppoinment";
import AppoinementsAdmin from "./components/AppoinmntsAdmin";
import PrintDoAppoinmentResipt from "./components/PrintDoAppoinmentResipt";
import PrintLabAppoinmentResipt from "./components/PrintLabAppoinmentResipt";
import GenerateReports from "./components/GenerateReports";
import SearchAppoinment from "./components/SearchAppoinment";
import GenerateDoctorReport from "./components/GenerateDoctorReport";
import GenerateLabTestReport from "./components/GenerateLabTestReport";
import AdminDashboard from "./components/AdminDashboard";
import HeaderNew from "./components/HeaderNew";
import Home from "./components/Home";

import AddCustomer from './components/AddCustomer';
import AllCustomers from './components/AllCustomers';
import ShowAll from './components/ShowAllDetails';
import Update from "./components/UpdateCustomer";

import PrintDoctort from './components/PrintDoctor';
import AddSalary from './components/AddSalary'
import SalaryRead from './components/SalaryRead';
import UpdateDoctor from './components/UpdateDoctor';
import ViewDoctor from './components/ViewDoctor';
import DeleteDoctor from './components/DeleteDoctor';
import AddDoctor from './components/AddDoctor';
import AllDoctorsRead from './components/AllDoctorsRead';
import NewView from './components/NewView';

import UpdateReport from './components/UpdateReport';
import DeleteReport from './components/DeleteReport';
import AddReport from './components/AddReport';
import AllReports from './components/AllReports';
import AddBloodReport from './components/AddBloodReports';
import AllBloodReports from './components/AllBloodReports';
import DeleteBloodReport from './components/DeleteBloodReport';
import UpdateBloodReport from './components/UpdateBloodReport';
import SearchReports from './components/SearchReports';
import ReportDetails from './components/ReportDetails';
import GenarateReport from './components/GenarateReport';
import LabMainPage from './components/LabMainPage';
import AddItems from './components/AddItems';
import AllItems from './components/AllItems';
import UpdateItem from './components/UpdateItem';
import DeleteItem from './components/DeleteItem';

import SpaceMaintenanceHome from "./components/common/SpaceMaintenanceHome";
import RoomBookingForm from "./components/roomService/RoomBookingForm";
import RoomInventory from "./components/roomService/RoomInventory";
import RoomMaintenanceForm from "./components/roomService/RoomMaintenanceForm";
import RoomBookingGrid from "./components/roomService/RoomBookingGrid";
import RoomBookingUpdate from "./components/roomService/RoomBookingUpdate";
import RoomInventoryGrid from "./components/roomService/RoomInventoryGrid";
import RoomInventoryUpdate from "./components/roomService/RoomInventoryUpdate";
import RoomMaintenanceGrid from "./components/roomService/RoomMaintenanceGrid";
import RoomMaintenanceUpdate from "./components/roomService/RoomMaintenanceUpdate";
import RoomStatus from "./components/roomService/RoomStatus";
import RoomMaintenanceStatus from "./components/roomService/RoomMaintenanceStatus";

import Buy from './components/Buy'
import ReadBuy from './components/ReadBuy';
import DeleBuy from './components/DeleteBuy';
import UpdateBuy from './components/UpdateBuy';
import AddNewMedicine from './components/AddNewMedicine';
import ReadMedicine from './components/ReadMedicine';
import DeleteMedicine from './components/DeleteMedicine';
import UpdateMedicine from './components/UpdateMedicine';
import AddTotal from './components/AddTotal';
import ReadTotal from './components/ReadTotal';
import PrintPrescription from './components/PrintPrescription';
import ReadBuyAdmin from './components/ReadBuyAdmin';
import SearchOrderByName from './components/SearchOrderByName';
import UpdateBuyAdmin from './components/UpdateBuyAdmin';


import AddPatient from './components/AddPatient';
import AllPatientsRead from './components/AllPatientsRead';
import DeletePatient from './components/DeletePatient';
import UpdatePatient from './components/UpdatePatient';
import ViewProfile from './components/ViewProfile';
import ViewPatient from './components/ViewPatient';
import UpdateProfile from './components/UpdateProfile';
import DeleteProfile from './components/DeleteProfile';

import PaymentPortalHome from "./components/payments/PaymentPortalHome";
import PaymentPortal from "./components/payments/PaymentPortal";
import Payments from "./components/payments/Payments";
import DoctorSalaryManager from "./components/salaries/DoctorSalaryManager";


import DoctorLoging from "./components/DoctorLogin";
import DoctorProfileUser from "./components/DoctorProfileUser";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import VideoAppoinment from "./components/VideoAppointment";

import './header_home.css'
import './App.css'
import './JavaSc'
//import './Doctor.css';
import './report.css';
import Login from "./components/Login";
import { useEffect, useState } from "react";
import Error from "./components/Error";

function App() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        setUser(localStorage.getItem('role') ? localStorage.getItem('role') : "");

    })

    return (
        <>
            <div className="App">
                <ToastContainer autoClose={3000} />
                <HeaderNew />
                {
                    user == "admin" ? (

                        <Router>
                            <Routes>
                                <Route exact path="/admin" element={<AdminDashboard />} />
                                {/* Thanuja - Online Pharmacy */}

                                <Route exact path='/addNewMedicine' element={<AddNewMedicine />} />
                                <Route exact path='/readMedicine' element={<ReadMedicine />} />
                                <Route exact path='/deleteMedicine/:id' element={<DeleteMedicine />} />
                                <Route exact path='/updateMedicine/:id' element={<UpdateMedicine />} />
                                <Route exact path='/printPrescription/:id' element={<PrintPrescription />} />
                                <Route exact path='/readPrescriptionAdmin' element={<ReadBuyAdmin />} />
                                <Route exact path='/updateBuyAdmin/:id' element={<UpdateBuyAdmin />} />
                                <Route exact path='/addTotalFee' element={<AddTotal />} />

                                {/* Rashini - Patient Management */}

                                <Route exact path="/addedPatient" element={<AddPatient />} />
                                <Route exact path="/readPatients" element={<AllPatientsRead />} />
                                <Route exact path="/deletePatient/:id" element={<DeletePatient />} />
                                <Route exact path="/updatePatient/:id" element={<UpdatePatient />} />
                                <Route exact path="/viewProfile/:id" element={<ViewProfile />} />

                                {/* Kamishka - Doctor management */}

                                <Route exact path="/addDoctor" element={<AddDoctor />} />
                                <Route exact path="/readDoctors" element={<AllDoctorsRead />} />
                                <Route exact path="/deleteDoctors/:id" element={<DeleteDoctor />} />
                                <Route exact path="/updateDoctors/:id" element={<UpdateDoctor />} />
                                <Route exact path="/ViewDoctor" element={<ViewDoctor />} />
                                <Route exact path="/NewView/:id" element={<NewView />} />
                                <Route exact path="/PrintDoctor/:id" element={<PrintDoctort />} />
                                <Route exact path="/addsalary" element={<AddSalary />} />
                                <Route exact path="/readSalary" element={<SalaryRead />} />

                                {/* Sadeepa - Online Chanelling */}

                                <Route exact path="/appoinmentAdmin" element={<AppoinementsAdmin />} />
                                <Route exact path="/generateReports" element={<GenerateReports />} />
                                <Route exact path="/readLabAppoinment" element={<ReadLabAppoinment />} />
                                <Route exact path="/updateLabAppoinment/:id" element={<UpdateLabAppoinment />} />
                                <Route exact path="/deleteLabAppoinment/:id" element={<DeleteLabAppoinment />} />
                                <Route exact path="/generateLabTestReport/:labTestType" element={<GenerateLabTestReport />} />
                                <Route exact path="/printLabAppoinment/:id" element={<PrintLabAppoinmentResipt />} />
                                <Route exact path="/readAppoinment" element={<ReadAppoinment />} />
                                <Route exact path="/updateAppoinment/:id" element={<UpdateAppoinment />} />
                                <Route exact path="/deleteAppoinment/:id" element={<DeleteAppoinment />} />
                                <Route exact path="/printAppoinment/:id" element={<PrintDoAppoinmentResipt />} />
                                <Route exact path="/generateDoctorReport/:dname" element={<GenerateDoctorReport />} />
                                <Route exact path="/backLabResipt" element={<ReadLabAppoinment />} />
                                <Route exact path="/backDocResipt" element={<ReadAppoinment />} />

                                {/* Tharindu - Payment */}

                                <Route path='/payments' element={<Payments />} />
                                <Route path='/doctorSalaryManager' element={<DoctorSalaryManager />} />


                                {/* Sandeepa - lab report management */}

                                <Route exact path="/main" element={<LabMainPage />} />
                                <Route exact path="/update/:id" element={<UpdateReport />} />
                                <Route exact path="/delete/:id" element={<DeleteReport />} />
                                <Route exact path="/labAllReports" element={<AllReports />} />
                                <Route exact path="/add" element={<AddReport />} />
                                <Route exact path="/addBlood" element={<AddBloodReport />} />
                                <Route exact path="/blood" element={<AllBloodReports />} />
                                <Route exact path="/deleteBlood/:id" element={<DeleteBloodReport />} />
                                <Route exact path="/updateBlood/:id" element={<UpdateBloodReport />} />
                                <Route exact path="/addItem" element={<AddItems />} />
                                <Route exact path="/item" element={<AllItems />} />
                                <Route exact path="/updateItem/:id" element={<UpdateItem />} />
                                <Route exact path="/deleteItem/:id" element={<DeleteItem />} />

                                {/* Shanuka - Customer Care */}

                                <Route path="/AllCustomers" exact element={<AllCustomers />} />
                                <Route path="/showAll" exact element={<ShowAll />} />
                                <Route path="/customerUpdate/:id" exact element={<Update />} />

                                {/* Isuru - Room Management */}
                                <Route exact path='/spaceMaintenance' element={<SpaceMaintenanceHome />} />
                                <Route exact path='/roomBookingEdit' element={<RoomBookingUpdate />} />
                                <Route exact path='/roomBookingGrid' element={<RoomBookingGrid />} />
                                <Route exact path='/inventory' element={<RoomInventory />} />
                                <Route exact path='/inventoryGrid' element={<RoomInventoryGrid />} />
                                <Route exact path='/inventoryEdit' element={<RoomInventoryUpdate />} />
                                <Route exact path='/maintenance' element={<RoomMaintenanceForm />} />
                                <Route exact path='/maintenanceGrid' element={<RoomMaintenanceGrid />} />
                                <Route exact path='/maintenanceUpdate' element={<RoomMaintenanceUpdate />} />
                                <Route exact path='/roomBookingStatus' element={<RoomStatus />} />
                                <Route exact path='/roomMaintenanceStatus' element={<RoomMaintenanceStatus />} />
                                <Route exact path='/roomBooking' element={<RoomBookingForm />} />


                            </Routes>
                        </Router>

                    ) : user == 'user' ? (

                        <Router>


                            <Routes>
                                <Route exact path="/appoinment" element={<Appoinements />} />
                                <Route exact path="/AddLabAppoinment" element={<AddLabAppoinment />} />
                                <Route exact path="/AddAppoinment" element={<AddAppoinment />} />
                                <Route exact path="/SearchAppoinment/:nic" element={<SearchAppoinment />} />
                                {/* <Route exact path="/appoinmentHome" element={<Appoinements />} /> */}

                                <Route path="/add" exact element={<AddCustomer />} />
                                <Route exact path='/videoconsultant' element={<VideoAppoinment />} />

                                <Route exact path="/get" element={<SearchReports />} />
                                <Route exact path="/getSearch/:ID" element={<ReportDetails />} />
                                <Route exact path="/genarateReport" element={<GenarateReport />} />

                                <Route exact path='/addpriscription' element={<Buy />} />
                                <Route exact path='/readPrescription/:name' element={<ReadBuy />} />
                                <Route exact path='/deletePrescription/:id' element={<DeleBuy />} />
                                <Route exact path='/updatePrescription/:id' element={<UpdateBuy />} />
                                <Route exact path='/readTotal/' element={<ReadTotal />} />
                                <Route exact path='/printPrescription/:id' element={<PrintPrescription />} />
                                <Route exact path='/saerchOrder' element={<SearchOrderByName />} />


                                <Route exact path="/deletePatient/:id" element={<DeletePatient />} />
                                <Route exact path="/viewProfile/:id" element={<ViewProfile />} />
                                <Route exact path="/updatePatient/:id" element={<UpdatePatient />} />

                                <Route exact path="/deleteProfile/:id" element={<DeleteProfile />} />
                                <Route exact path="/viewPatient/:id" element={<ViewPatient />} />
                                <Route exact path="/updateProfile/:id" element={<UpdateProfile />} />

                                <Route exact path='/paymentportal' element={<PaymentPortalHome />} />
                                <Route exact path='/paymentportal/pay' element={<PaymentPortal />} />

                            </Routes>

                        </Router>


                    ) : null

                }
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/register" element={<AddPatient />} />
                        <Route exact path="/doctorLogin" element={<DoctorLoging />} />
                        <Route exact path="/doctorProfileUser/:id" element={<DoctorProfileUser />} />
                        {/*<Route exact path="/*" element={<Navigate to={"/"} replace />} />*/}
                    </Routes>
                </Router>
            </div>
        </>
    );
}

export default App;
