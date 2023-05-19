import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpaceMaintenanceHome from "../Componanats/common/SpaceMaintenanceHome";
import RoomBookingForm from "../Componanats/roomService/RoomBookingForm";
import RoomInventory from "../Componanats/roomService/RoomInventory";
import RoomMaintenanceForm from "../Componanats/roomService/RoomMaintenanceForm";
import RoomBookingGrid from "../Componanats/roomService/RoomBookingGrid";
import RoomBookingUpdate from "../Componanats/roomService/RoomBookingUpdate";
import RoomInventoryGrid from "../Componanats/roomService/RoomInventoryGrid";
import RoomInventoryUpdate from "../Componanats/roomService/RoomInventoryUpdate";
import RoomMaintenanceGrid from "../Componanats/roomService/RoomMaintenanceGrid";
import RoomMaintenanceUpdate from "../Componanats/roomService/RoomMaintenanceUpdate";
import RoomStatus from "../Componanats/roomService/RoomStatus";
import RoomMaintenanceStatus from "../Componanats/roomService/RoomMaintenanceStatus";

export function Routerlist() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<></>} />
                <Route path='/spaceMaintenance' element={<SpaceMaintenanceHome />} />
                <Route path='/roomBooking' element={<RoomBookingForm />} />
                <Route path='/roomBookingEdit' element={<RoomBookingUpdate />} />
                <Route path='/roomBookingGrid' element={<RoomBookingGrid />} />
                <Route path='/inventory' element={<RoomInventory />} />
                <Route path='/inventoryGrid' element={<RoomInventoryGrid />} />
                <Route path='/inventoryEdit' element={<RoomInventoryUpdate />} />
                <Route path='/maintenance' element={<RoomMaintenanceForm />} />
                <Route path='/maintenanceGrid' element={<RoomMaintenanceGrid />} />
                <Route path='/maintenanceUpdate' element={<RoomMaintenanceUpdate />} />
                <Route path='/roomBookingStatus' element={<RoomStatus />} />
                <Route
                    path='/roomMaintenanceStatus'
                    element={<RoomMaintenanceStatus />}
                />
            </Routes>
        </BrowserRouter>
    );
}
