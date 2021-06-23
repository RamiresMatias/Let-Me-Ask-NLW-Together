import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import { Room } from "./pages/Rooms"


import { BrowserRouter, Route , Switch} from "react-router-dom"

import { AuthContextProvider } from "./contexts/AuthContext"


function App() {

  /**
   * Dentro do AuthContext, tem um componente chamado provider
   * Ou seja, acessando uma propriedade que há dentro de um objeto
   */
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new" component={NewRoom}/>
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
