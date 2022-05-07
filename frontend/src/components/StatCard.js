import React from "react"

function StatCard({
    className = "",
    title = "",
    stat = "",
    icon = null,
    statSize = "text-6xl",
}) {
    const finalClass = `${className} w-full max-w-xs flex flex-col-reverse sm:flex-row items-center justify-between border border-gray-300 rounded-sm bg-white px-6 py-6`
    return (
        <div className={finalClass}>
            <div className="">
                <span className={`${statSize} font-bold block leading-none`}>
                    {stat}
                </span>
                <span className="mt-2 block">{title}</span>
            </div>
            {icon
                ? React.cloneElement(icon, {
                    className:
                        "mb-2 sm:mb-0 sm:mr-2 text-3xl sm:text-3xl text-blue-800",
                })
                : ""}
        </div>
    )
}

export default StatCard