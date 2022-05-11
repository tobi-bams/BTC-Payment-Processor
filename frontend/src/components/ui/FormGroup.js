import React from "react"

function FormGroup({
    className = "",
    horizontal = false,
    children = null,
    ...newProps
}) {
    let finalClass = `${className} my-6`
    if (horizontal)
        finalClass += ` grid grid-cols-1 gap-6 sm:mb-0 sm:gap-6 sm:grid-cols-${children.length}`
    return (
        <div className={finalClass} {...newProps}>
            {children}
        </div>
    )
}

export default FormGroup