import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import { Room } from "./pages/Rooms"


import { BrowserRouter, Route , Switch} from "react-router-dom"

import { AuthContextProvider } from "./contexts/AuthContext"
import { AdminRoom } from "./pages/AdminRoom"


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

          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
