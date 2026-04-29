import React, { useState } from 'react'

function CustomToast({ message }: { message: string }) {
    const [show, setShow] = useState(true);
    if(!message || !show) {
        return null;
    }

    const handleClose = () => {
        setShow(false);
    }
  
    return (
    <div style={styles.wrapper}>
        <i onClick={handleClose} style={{ float: "right", cursor: "pointer" }}>X</i>
        <p style={{ margin: 20  }}>{ message }</p>
    </div>
  )
}

export default CustomToast

const styles: { [key: string]: React.CSSProperties } = {
    wrapper: {
        minWidth: 200,
        height: 100,
        background: "red",
        color: "#fff",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        border: "1px solid blue",
        position: "fixed",
        right: 10,
        bottom: 10
    }
}