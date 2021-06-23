import { useHistory } from "react-router-dom"

import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import "../style/auth.scss"

import {Button} from "../components/Button"
import { useAuth } from "../hooks/useAuth"
import { FormEvent, useState } from "react"
import { database } from "../services/firebase"

export function Home(){

    const history = useHistory()
    const { signinWithGoogle, user } = useAuth()
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom(){

        // Se o usuário não estiver autenticado, chama o signin do Google
        if(!user){
            await signinWithGoogle()
        }

        history.push("/rooms/new")
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault()

        if(roomCode.trim() === ''){
            return
        }

        // Busca a sala específica que o usuário está tentando acessar do firebase
        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()){
            alert('Room does not exists.')

            return
        }

        // Redireciona o usuário para a sala
        history.push(`/rooms/${roomCode}`)
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
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text" 
                        placeholder="Digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />

                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}