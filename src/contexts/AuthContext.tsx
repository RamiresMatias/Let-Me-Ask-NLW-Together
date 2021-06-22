import firebase from "firebase";
import { createContext , ReactNode, useEffect, useState} from "react";
import { auth } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    // Define a tipagem da função que retorna uma promessa, e dentro dessa promessa não tem nenhum retorno
    signinWithGoogle: () => Promise < void > ;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps){

    const [user, setUser] = useState<User>()

  
    useEffect(() => {
      //Evento listener, que monitora caso um usuário esteja logado anteriormente, 
      // para retornar os dados do usuário
      const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
          const {displayName, photoURL, uid} = user
  
          if(!displayName || !photoURL){
            throw new Error("Missing information from Google Account.")
          }
    
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      })
  
      return () =>{
        // Para de escutar o evento listener caso o usuário saia da tela, para não gerar erro
        unsubscribe()
      }
    }, [])
  
    async function signinWithGoogle() {
  
      // Instância um objeto de autenticação do Google para ser exibido
      const provider = new firebase.auth.GoogleAuthProvider()
  
      // Abrirá o login do Gogole como um Popup na tela
      const result = await auth.signInWithPopup(provider)
  
      if(result.user){
        const {displayName, photoURL, uid} = result.user
  
        if(!displayName || !photoURL){
          throw new Error("Missing information from Google Account.")
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
  
    }


    return (
        <AuthContext.Provider value={{ user , signinWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    )
}