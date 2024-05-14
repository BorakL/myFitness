import React from "react";
import "./modal.css"
import { GrClose } from "react-icons/gr";

const ModalInfo = ({onClose, title, img, info})=>{
    return(
        <div className="backdrop">
            <div className="modal">
                <div onClick={onClose} className="closeModalButton"><GrClose/></div>
                <div className="contentModal">
                    <h4>{title}</h4>
                    {
                        img &&
                        <div>
                            <img src={`${process.env.REACT_APP_APIURL}/img/${img}`}/>
                        </div>
                    }
                    <div>{info}</div>
                </div>
            </div>
        </div>
    )
}

export default ModalInfo;