import React from "react";
import "./modal.css"
import { apiURL } from "../../definitions";
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
                            <img src={`${apiURL}/img/${img}`}/>
                        </div>
                    }
                    <div>{info}</div>
                </div>
            </div>
        </div>
    )
}

export default ModalInfo;