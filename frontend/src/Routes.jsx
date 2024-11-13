import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer"
import Servicos from "./servico/Servicos";

function Routes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path="/" element={<Servicos />} />
            </Switch>
            <Footer/>
        </BrowserRouter>
    )
}

export default Routes;