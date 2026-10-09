import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesPedido from "../../../components/Listagens/DetalhesPedido/DetalhesPedido";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesPedido(): JSX.Element {
    const { id_pedido } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />

            <DetalhesPedido idPedido={Number(id_pedido)} />

            <Rodape />
        </div>
    );
}

export default PDetalhesPedido;