import React from 'react'

export default function Model({children, onClose}) {
  return (
    <>
    <div className = 'backdrop' onClick = {onClose}></div>
        <dialog className = 'model' open>
            {children}
        </dialog>
    
    </>
  )
}
