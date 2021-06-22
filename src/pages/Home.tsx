import { useHistory } from "react-router-dom"

import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import "../style/auth.scss"

import {Button} from "../components/Button"
import { useAuth } from "../hooks/useAuth"

export function Home(){

    const history = useHistory()
    const { signinWithGoogle, user } = useAuth()

    async function handleCreateRoom(){

        // Se o usuário não estiver autenticado, chama o signin do Google
        if(!user){
            await signinWithGoogle()
        }

        history.push("/rooms/new")
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando pergutnas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main className="main-content">
                <div>
                    <img src={logoImg} alt="Letmeask" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form action="">
                        <input 
                        type="text" 
                        placeholder="Digite o código da sala"
                        />

                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}