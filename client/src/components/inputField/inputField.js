import React, { useEffect } from "react";

const InputField = ({
        type,
        value,
        name,
        placeholder,
        handleChange,
        className,
        required,
        inputRef,
        errorMsg,
        maxLength,
        size
    })=>{ 

    return(
        <div className="inputField">
            <input
                type={type}
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                className={className}
                required={required}
                ref={inputRef}
                maxLength={maxLength}
                size={size}
            />
            <span className="errorMsg">
                {errorMsg}
            </span>
        </div>
    )
}

export default InputField;