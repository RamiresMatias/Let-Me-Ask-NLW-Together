import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type QuestionType = {
    id:String;
    author:{
        name:string;
        avatar:string;
    }
    content:string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}

type FirebaseQuestion = Record<string,{
    author:{
        name:string;
        avatar:string;
    }

    content:string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string
    }>
}>

export function useRoom(roomId: string){

    const {user} = useAuth()
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        // Escuta o evento de novas perguntas
        roomRef.on('value', room => {

            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestion = databaseRoom.questions ?? {}

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id:key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    // Pega os valores dos likes e coloca em um array
                    likeCount: Object.values(value.likes ?? {}).length,
                    // Se o usuário não tiver dado like ele não retorna nada.
                    likeId: Object.entries(value.likes ?? {}).find(
                        ([key, like]) => like.authorId === user?.id)?.[0],
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })

        return () => {
            roomRef.off('value')
        }

    }, [roomId, user?.id])

    return {questions, title}
}