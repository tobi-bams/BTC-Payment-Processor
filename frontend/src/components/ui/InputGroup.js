import React from "react"

const InputGroup = React.forwardRef(({
    className = "",
    label = "",
    name = "",
    type = "text",
    placeholder = "",
    error = false,
    errorText = "",
    defaultValue = "",
    description = "",
    horizontal = false,
    onChange = () => { },
    ...newProps
}, ref) => {
    const hasError = error || errorText
    const finalClass = `${className} w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400 ${hasError && `border-red-600`
        }`
    return (
        <div className={horizontal ? "sm:flex sm:items-center" : ""}>
            {label && (
                <label
                    className={`text-sm text-gray-600 ${hasError && "text-red-600"} ${horizontal && "sm:w-24"
                        }`}
                    htmlFor={name}
                >
                    {label}
                </label>
            )}
            <div className={horizontal ? "sm:flex-1" : ""}>
                <input
                    type={type}
                    name={name}
                    className={finalClass}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={e => onChange(e.currentTarget.value)}
                    {...newProps}
                />
                {description && (
                    <span className="mt-2 text-gray-600 text-xs">{description}</span>
                )}
                {errorText && (
                    <div className="bg-red-200 mt-2 py-2 px-4 text-xs text-red-600 rounded-sm">
                        {errorText}
                    </div>
                )}
            </div>
        </div>
    )
});


export default InputGroup