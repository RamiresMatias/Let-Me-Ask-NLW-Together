import { useParams, useHistory } from "react-router-dom"

import logoImg from "../assets/images/logo.svg"
import deleteImg from "../assets/images/delete.svg"
import { Button } from "../components/Button"
import { Question } from "../components/Question"
import { RoomCode } from "../components/RoomCode"


import { useRoom } from "../hooks/useRoom"


import "../style/room.scss"
import { database } from "../services/firebase"

type RoomParams = {
    id:string;
}


export function AdminRoom(){

    const params = useParams<RoomParams>()
    const roomId = params.id
    const {title, questions} = useRoom(roomId)
    const history = useHistory()

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/')
    }

    // Método para deletar uma pergunta pelo admin
    async function handleDeleteQuestion(questionId: String){
        if(window.confirm('Tem certeza que deseja excluir essa pergunta?')){
            const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button type="submit" isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question =>{
                        return (
                            <Question 
                                content={question.content} 
                                author={question.author}
                                //key={question.author}
                            >
                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    )
}