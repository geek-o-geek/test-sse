import React, { forwardRef, useEffect } from 'react'

type propsType = {
    inputHandler: () => void,
    type: string,
    value: string
}

function CustomInput({ inputHandler, type, value }: propsType, ref: React.RefObject<HTMLInputElement>) {
    useEffect(() => {
        if(ref && typeof ref !== "function") {
            ref.current?.focus();
        }
    }, [ref]);

    return (
        <div style={{width: '100%'}}>
            <input
                style={{width: '100%', padding: 10 }}
                ref={ref} 
                type={type}
                value={value} 
                onChange={(e) => inputHandler(e)} 
            />
        </div>
    )
}

export default forwardRef(CustomInput)