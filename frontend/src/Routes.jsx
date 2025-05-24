import { Routes as Switch, Route } from "react-router-dom";
// Navbar e Footer são renderizados em App.js
// import Navbar from "./Navbar"; 
// import Footer from "./Footer";
import Home from "./Home"; // Importar o novo componente Home
import Servicos from "./servico/Servicos";
import Organizacao from "./Organizacao"; // Importar Organizacao
import Contato from "./Contato"; // Importar Contato
import PaginaRelatorio from "./PaginaRelatorio"; // Importar o novo componente

function RoutesComponent() { // Renomear para evitar confusão com o 'Routes' do react-router-dom
    return (
        // BrowserRouter foi removido daqui, pois já está em index.js
        // Navbar e Footer foram removidos daqui, pois já estão em App.js
            <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Servicos />} />
            {/* Rotas específicas para tipos de serviço */}
            <Route path="/servicos/tipo/:tipoServico" element={<Servicos />} /> 
            <Route path="/relatorios/data-pagamento" element={<PaginaRelatorio />} />
            <Route path="/relatorios/pagamentos-pendentes" element={<PaginaRelatorio />} />
            <Route path="/relatorios/pagamento-parcial" element={<PaginaRelatorio />} />
            <Route path="/relatorios/servicos-cancelados" element={<PaginaRelatorio />} />
            <Route path="/organizacao" element={<Organizacao />} />
            <Route path="/contato" element={<Contato />} />
            {/* Adicione outras rotas aqui, por exemplo:
            <Route path="/clientes" element={<Clientes />} /> 
            */}
            </Switch>
    );
}

export default RoutesComponent;