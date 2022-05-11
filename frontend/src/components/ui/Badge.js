import React from "react"

function Badge({
    className = "",
    text = "New",
    type = "primary",
    onX = null,
    ...newProps
}) {
    let finalClass = `${className} rounded-sm py-1 px-2 text-xs font-medium`
    if (type === "primary") finalClass += " text-white bg-blue-600"
    else if (type === "secondary") finalClass += " text-white bg-gray-600"
    else if (type === "success") finalClass += " text-white bg-green-600"
    else if (type === "danger") finalClass += " text-white bg-red-600"
    else if (type === "warning") finalClass += " text-black bg-yellow-400"
    else if (type === "info") finalClass += " text-white bg-indigo-300"
    else if (type === "light") finalClass += " text-black bg-gray-200"
    else if (type === "dark") finalClass += " text-white bg-gray-900"
    return (
        <span className={finalClass} {...newProps}>
            {text}
            {onX && (
                <span className="ml-2 text-base cursor-pointer" onClick={onX}>
                    &times;
                </span>
            )}
        </span>
    )
}

export default Badge