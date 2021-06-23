import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react"

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import "../style/auth.scss";

import { Button } from "../components/Button"
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";


export function NewRoom(){

    const {user} = useAuth()
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault()

        if(newRoom.trim() === ''){
            return
        }

        // Referência para um registro de dado no BD
        const roomRef = database.ref('rooms')

        // Faz um push para dentro de rooms. Jogando uma nova sala dentro de rooms
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        // Redireciona o usuário para a sala criada com o id da sala
        history.push(`/rooms/${firebaseRoom.key}`)
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                        type="text" 
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                        />

                        <Button type="submit">Criar sala</Button>
                    
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}