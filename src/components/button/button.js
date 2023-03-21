import React from "react";

const InputButton = ({
    type, 
    className,
    value,
    disabled
})=>{
    return (
        <div>
            <input
                className={className}
                type={type}
                value={value}
                disabled={disabled}
            />
        </div>
    )
}

export default InputButton;