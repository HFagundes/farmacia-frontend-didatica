import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesCliente from "../../../components/Listagens/DetalhesCliente/DetalhesClientes";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesCliente(): JSX.Element {
    const { id_cliente } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />

            <DetalhesCliente idCliente={Number(id_cliente)} />

            <Rodape />
        </div>
    );
}

export default PDetalhesCliente;