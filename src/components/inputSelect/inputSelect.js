import React from "react";

const InputSelect = ({ 
    name, 
    options,
    handleChange,
    inputRef,
    placeholder,
    required,
    className
})=>{
    return(
        <div className="inputField">
            <select 
                name={name} 
                id={name} 
                onChange={handleChange}
                required={required} 
                defaultValue="" 
            >
                <option disabled value="">
                    {placeholder}
                </option>
                {options.map(o=>
                    <option 
                        key={o.name}
                        value={o.value}
                    >
                        {o.name}
                    </option>    
                )}
            </select>        
        </div>
    )
}

export default InputSelect;