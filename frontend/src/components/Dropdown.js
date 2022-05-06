import React, { useEffect, useState } from "react"
import Transition from "./Transition"

function Dropdown({
    className = "",
    header = null,
    options,
    align = "right",
    ...newProps
}) {
    const [show, setShow] = useState(false)
    useEffect(() => {
        setTimeout(() => setShow(true), 1)
    }, [])
    let finalClass = `${className} absolute bg-white px-1 py-2 w-64 mt-4 shadow-2xl rounded-sm max-w-screen origin-center`
    if (align === "left") finalClass += " left-0"
    else finalClass += " right-0"
    const createOption = o => {
        const OptionTag = o.link ? "a" : "div"
        return (
            <OptionTag
                key={o.id}
                className="flex items-center px-3 py-3 cursor-pointer hover:bg-gray-200 font-light text-sm focus:outline-none"
                href={o.link}
            >
                {o.icon ? <div class="mr-2">{o.icon}</div> : null}
                {o.text}
            </OptionTag>
        )
    }
    const Items = options.map((o, index) => {
        if (Array.isArray(o))
            return (
                <div
                    key={`${o[0].id}a`}
                    className="border-b border-gray-100 last:border-b-0"
                >
                    {o.map(ob => createOption(ob))}
                </div>
            )
        else return createOption(o)
    })
    const Banner = header ? (
        <div class="border-b border-gray-100 px-3 py-3">{header}</div>
    ) : null

    return (
        <Transition show={show}>
            <Transition
                enter="transition duration-200 ease-in-out transform"
                enterFrom="opacity-0 scale-95 -translate-y-2"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition duration-200 ease-in-out transform"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 -translate-y-2"
            >
                <div className={finalClass} {...newProps}>
                    {Banner}
                    {Items}
                </div>
            </Transition>
        </Transition>
    )
}

export default Dropdown;