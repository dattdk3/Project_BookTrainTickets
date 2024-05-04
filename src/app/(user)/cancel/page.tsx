"use client";
import { TicketService } from "@/service/ticket/ticketService";
import "./css.css";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'; const Cancel = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="message-box _success _failed">
                    <i> <CancelOutlinedIcon color="error" sx={{ fontSize: 40 }} /></i>
                    <h2> Thanh Toán Thất bại</h2>
                    <p>  Hãy Thử Lại </p>
                </div>
            </div>
        </div>
    );
};
export default Cancel;
