import { useState, useEffect, type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormPedido from "../../../components/Formularios/FormPedido/FormPedido";
import type { PedidoDTO } from "../../../dto/PedidoDTO";

function PCadastroPedido(): JSX.Element {
  const [pedidos, setPedidos] = useState<PedidoDTO[]>([]);

  const carregarPedidos = async () => {
    try {
      const resposta = await fetch("http://localhost:3333/api/produtos");
      if (resposta.ok) {
        const dados = await resposta.json();
        setPedidos(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar a lista de pedidos:", error);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navegacao />
      <FormPedido pedidos={pedidos} onSuccess={carregarPedidos} />
      <Rodape />
    </div>
  );
}

export default PCadastroPedido;
