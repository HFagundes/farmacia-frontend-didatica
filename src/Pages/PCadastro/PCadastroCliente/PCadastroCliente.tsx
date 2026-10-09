import { useState, useEffect, type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormCliente from "../../../components/Formularios/FormCliente/FormCliente";
import type { ClienteDTO } from "../../../dto/ClienteDTO";

function PCadastroCliente(): JSX.Element {
  const [clientes, setClientes] = useState<ClienteDTO[]>([]);

  const carregarClientes = async () => {
    try {
      const resposta = await fetch("http://localhost:3333/api/clientes");
      if (resposta.ok) {
        const dados = await resposta.json();
        setClientes(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar a lista de clientes:", error);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navegacao />
      <FormCliente clientes={clientes} onSuccess={carregarClientes} />
      <Rodape />
    </div>
  );
}

export default PCadastroCliente;
