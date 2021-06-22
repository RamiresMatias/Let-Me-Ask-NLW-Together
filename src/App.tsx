import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { BrowserRouter, Route } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext"




function App() {

  /**
   * Dentro do TestContext, tem um componente chamado provider
   * Ou seja, acessando uma propriedade que há dentro de um objeto
   */
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" component={NewRoom}/>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
