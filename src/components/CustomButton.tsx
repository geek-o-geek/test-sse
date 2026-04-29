import React from 'react'

type buttonType = 'submit' | 'reset' | 'button';

function CustomButton({handleSubmit, btnName, type, customStyle}: {handleSubmit: () => void, btnName: string, type: buttonType, customStyle?: React.CSSProperties}) {
  return (
    <div>
        <button 
            type={type}
            style={{...styles.btn, marginRight: 10, ...customStyle} } 
            onClick={handleSubmit}>
                {btnName}
        </button>
    </div>
  )
}

export default CustomButton

const styles: { [key: string]: React.CSSProperties } = {
    btn: {
        marginTop: 20,
        padding: 10,
        minWidth: 100,
        color: "white",
        background: "#636B2F",
        border: "1px solid black",
        cursor: "pointer",
        borderRadius: 100
    }
}