import { BrowserRouter, Navigate, Route, Routes, Link } from 'react-router-dom';

import ProtectedRoute from './components/Rotas/ProtectRoutes';
import PLogin from './Pages/PLogin/PLogin';
import PCadastroProduto from './Pages/PCadastro/PCadastroProduto/PCadastroProduto';
import PCadastroCliente from './Pages/PCadastro/PCadastroCliente/PCadastroCliente';
import PCadastroPedido from './Pages/PCadastro/PCadastroPedido/PCadastroPedido';
import PCadastroItemPedido from './Pages/PCadastro/PCadastroItemPedido/PCadastroItemPedido';
import ListagemProdutos from './components/Listagens/ListagemProduto/ListagemProduto';
import ListagemClientes from './components/Listagens/ListagemCliente/ListagemCliente';
import ListagemPedidos from './components/Listagens/ListagemPedido/ListagemPedido';
import ListagemItemPedido from './components/Listagens/ListagemItemPedido/ListagemItemPedido';

import './App.css';

function LandingPage() {
  const modulos = [
    {
      titulo: 'Produtos',
      descricao: 'Gerencie o catálogo, estoque e preços dos itens da farmácia.',
      rota: '/lista/produtos',
      tipo: 'produtos',
      icone: '▣',
    },
    {
      titulo: 'Clientes',
      descricao: 'Cadastre e consulte clientes e seus dados de contato.',
      rota: '/lista/clientes',
      tipo: 'clientes',
      icone: '⇄',
    },
    {
      titulo: 'Pedidos',
      descricao: 'Acompanhe pedidos e valores por transação da farmácia.',
      rota: '/lista/pedidos',
      tipo: 'pedidos',
      icone: '◇',
    },
    {
      titulo: 'Itens do Pedido',
      descricao: 'Controle quantidade, cliente e valor unitário dos itens.',
      rota: '/lista/item-pedido',
      tipo: 'itens-pedido',
      icone: '▥',
    },
  ];

  return (
    <div className="farmacia-app">
      <header className="topo">
        <div className="container topo-inner">
          <div className="brand" aria-label="Logo da farmacia">
            <div className="brand-mark">+</div>
            <div className="brand-text">
              <strong>farmacia</strong>
              <span>didática</span>
            </div>
          </div>

          <nav className="menu" aria-label="Navegação principal">
            <Link to="/">Início</Link>
            <Link to="/lista/produtos">Produtos</Link>
            <Link to="/lista/clientes">Clientes</Link>
            <Link to="/lista/pedidos">Pedidos</Link>
            <Link to="/lista/item-pedido">Itens</Link>
          </nav>

          <Link to="/login" className="botao-primary link-button">
            Entrar
          </Link>
        </div>
      </header>

      <main className="container hero-section">
        <div className="hero-copy">
          <span className="badge">Sistema da farmácia</span>

          <h1>
            Gestão completa de <span>saúde</span>,
            <br />
            estoque e atendimento.
          </h1>

          <p>
            Centralize cadastro de produtos, clientes, pedidos e itens do pedido em uma interface moderna e organizada.
          </p>

          <div className="hero-actions">
            <Link to="/lista/produtos" className="botao-primary link-button">
              Acessar módulos
            </Link>
            <Link to="/login" className="botao-secundario link-button">
              Login
            </Link>
          </div>

          <div className="stats">
            <div>
              <strong>4</strong>
              <span>Módulos</span>
            </div>
            <div>
              <strong>24h</strong>
              <span>Operação</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Digital</span>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-pill">Painel principal</div>

          <div className="card-box">
            <div className="icon-circle">✚</div>
            <div>
              <p className="card-label">Controle</p>
              <h3>Farmácia didática</h3>
            </div>
          </div>

          <ul>
            <li>
              <span className="dot green"></span>
              Estoque organizado
            </li>
            <li>
              <span className="dot blue"></span>
              Clientes cadastrados
            </li>
            <li>
              <span className="dot gold"></span>
              Pedidos em fluxo
            </li>
          </ul>

          <div className="price-box">
            <small>Atalho</small>
            <strong>Operações</strong>
          </div>
        </div>
      </main>

      <section className="container servicos-section">
        <div className="section-heading">
          <span>Módulos</span>
          <h2>Escolha o que deseja gerenciar</h2>
        </div>

        <div className="servicos-grid">
          {modulos.map((modulo) => (
            <article key={modulo.titulo} className="servico-card destaque">
              <div className="servico-icon">{modulo.icone}</div>
              <h3>{modulo.titulo}</h3>
              <p>{modulo.descricao}</p>
              <Link to={modulo.rota} className="card-link">
                Acessar {modulo.titulo}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PLogin />} />

        <Route path="/lista/produtos" element={<ProtectedRoute element={<ListagemProdutos />} />} />
        <Route path="/lista/clientes" element={<ProtectedRoute element={<ListagemClientes />} />} />
        <Route path="/lista/pedidos" element={<ProtectedRoute element={<ListagemPedidos />} />} />
        <Route path="/lista/item-pedido" element={<ProtectedRoute element={<ListagemItemPedido />} />} />

        <Route path="/cadastro/produto" element={<ProtectedRoute element={<PCadastroProduto />} />} />
        <Route path="/cadastro/cliente" element={<ProtectedRoute element={<PCadastroCliente />} />} />
        <Route path="/cadastro/pedido" element={<ProtectedRoute element={<PCadastroPedido />} />} />
        <Route path="/cadastro/item-pedido" element={<ProtectedRoute element={<PCadastroItemPedido />} />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
