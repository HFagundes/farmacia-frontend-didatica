import { useState, useEffect, type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormItemPedido from "../../../components/Formularios/FormItemPedido/FormItemPedido";
import type { ItemPedidoDTO } from "../../../dto/ItemPedidoDTO";

function PCadastroItemPedido(): JSX.Element {
  const [itensPedido, setItensPedido] = useState<ItemPedidoDTO[]>([]);

  const carregarItensPedido = async () => {
    try {
      const resposta = await fetch("http://localhost:3333/api/item-pedido");
      if (resposta.ok) {
        const dados = await resposta.json();
        setItensPedido(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar a lista de itens do pedido:", error);
    }
  };

  useEffect(() => {
    carregarItensPedido();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navegacao />
      <FormItemPedido itensPedido={itensPedido} onSuccess={carregarItensPedido} />
      <Rodape />
    </div>
  );
}

export default PCadastroItemPedido;
