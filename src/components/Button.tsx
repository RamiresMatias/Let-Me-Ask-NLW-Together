import { ButtonHTMLAttributes } from "react" // Tipagem de um botão

import "../style/button.scss"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps){

    return(
        <button className="button" {...props}>
        </button>
    )
}
