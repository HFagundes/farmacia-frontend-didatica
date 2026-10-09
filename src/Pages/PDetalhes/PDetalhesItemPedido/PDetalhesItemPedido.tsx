import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesItemPedido from "../../../components/Listagens/DetalhesItemPedido/DetalhesItemPedido";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesItemPedido(): JSX.Element {
    const { id_item_pedido } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />

            <DetalhesItemPedido idItemPedido={Number(id_item_pedido)} />

            <Rodape />
        </div>
    );
}

export default PDetalhesItemPedido;