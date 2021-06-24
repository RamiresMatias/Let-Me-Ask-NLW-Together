import { ButtonHTMLAttributes } from "react" // Tipagem de um botão

import "../style/button.scss"

// Ele recebe propriedades de HTMLBUtton nativo + propriedades definidas
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
}
// Tudo que não for isOutlined, ele pega o resto dos atributos passados pelo componente
export function Button({isOutlined = false, ...props}: ButtonProps){

    return(
        <button 
        className={`button ${isOutlined ? 'outlined': ''}`}
        {...props}>
        </button>
    )
}
