import React from "react"
import { Link } from "react-router-dom";
import Button from "./Button"

function Card({
    className = "",
    image = "",
    title = "",
    text = "",
    buttonText = null,
    buttonLink = "",
    html = null,
    ...newProps
}) {
    let finalClass = `${className} max-w-full border border-gray-300 rounded-sm bg-white`
    return (
        <div className={finalClass}>
            {image && (
                <div className="w-full h-48">
                    <img src={image} className="w-full h-full object-cover" alt={title} />
                </div>
            )}
            <div className="p-6">
                {title && <h5 className="text-xl text-dark font-medium">{title}</h5>}
                {text && <p className={`${title && "mt-2 text-base"}`}>{text}</p>}
                {html}
                {buttonText && (
                    <div className="mt-4 flex">
                        <Link to={buttonLink}>
                            <Button text={buttonText} type="secondary" size="sm" full />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Card