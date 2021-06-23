import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export function useAuth(){
    const value = useContext(AuthContext)

    // Componentes que utilizam esse hook poderão compartilhar informação de autenticação
    return value
}
