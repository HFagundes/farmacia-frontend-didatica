import { useEffect, useState, type JSX } from "react";
import ItemPedidoRequests from "../../../fetch/ItemPedidoRequest";
import type { ItemPedidoDTO } from "../../../dto/ItemPedidoDTO";
import { useNavigate } from "react-router-dom";
import Utilitario from "../../../Utils/Utilitario";

interface DetalhesItemPedidoProps {
    idItemPedido: number;
}

function DetalhesItemPedido({ idItemPedido }: DetalhesItemPedidoProps): JSX.Element {
    const [itemPedido, setItemPedido] = useState<ItemPedidoDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);

            try {
                const dados = await ItemPedidoRequests.obterItemPedidoPorId(idItemPedido);

                if (dados) {
                    setItemPedido(dados);
                } else {
                    setError("Item do pedido não encontrado.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes do item do pedido:", err);
                setError("Ocorreu um erro ao buscar as informações do item do pedido.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [idItemPedido]);

    if (loading) {
        return (
            <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">
                <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
                        <div className="h-5 bg-gray-200 rounded w-1/3 mb-8"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item}>
                                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                                    <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !itemPedido) {
        return (
            <main className="bg-gray-200 flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="text-red-500 text-5xl mb-4">
                        <i className="pi pi-exclamation-triangle"></i>
                    </div>

                    <h2 className="text-xl font-bold text-slate-800 mb-2">
                        Item do pedido não encontrado
                    </h2>

                    <p className="text-slate-500 mb-6">
                        {error || "Não foi possível encontrar este item do pedido."}
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/lista/item-pedido")}
                        className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-md font-bold transition-all"
                    >
                        Voltar para Itens do Pedido
                    </button>
                </div>
            </main>
        );
    }

    const estoqueBaixo = Utilitario.estoqueBaixo(
        Number(itemPedido.quantidade_produto ?? 0),
        0
    );

    const quantidadeDisponivel = Number(itemPedido.quantidade_produto ?? 0);

    return (
        <main className="bg-gradient-to-b from-blue-50 to-gray-100 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">
            <div className="w-full max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl shadow-lg p-6 sm:p-8 text-white animate-fade-in">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
                                <i className="pi pi-shopping-cart"></i>
                                Item do Pedido
                            </h1>
                            <p className="text-blue-100 text-sm">
                                Visualizando detalhes completos do item do pedido.
                            </p>
                        </div>

                        <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                                itemPedido.idVenda
                                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50"
                                    : "bg-red-500 text-white shadow-lg shadow-red-500/50"
                            }`}
                        >
                            <i className={itemPedido.idVenda ? "pi pi-check-circle" : "pi pi-times-circle"}></i>
                            {itemPedido.idVenda ? "Ativo" : "Inativo"}
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-b-2xl shadow-lg p-5 sm:p-8 animate-fade-in-delayed">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-xl border border-sky-200">
                            <div>
                                <span className="text-xs font-semibold text-sky-600 uppercase tracking-widest block mb-1">
                                    Código do Item
                                </span>
                                <span className="text-lg font-bold text-sky-900">
                                    {itemPedido.idVenda ?? "-"}
                                </span>
                            </div>

                            <button
                                onClick={() => {
                                    if (itemPedido.idVenda !== undefined) {
                                        navigator.clipboard.writeText(String(itemPedido.idVenda));
                                        alert("Código do item copiado!");
                                    }
                                }}
                                className="px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-bold transition-all"
                                title="Copiar código do item"
                            >
                                <i className="pi pi-copy mr-1"></i> Copiar
                            </button>
                        </div>

                        <hr className="border-t border-gray-200 my-6" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
                                <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-5">
                                    <i className="pi pi-box text-blue-600 text-xl"></i>
                                    Informações do Item
                                </h2>

                                <div className="flex flex-col gap-6">
                                    <div>
                                        <span className="block text-xs uppercase text-blue-600 font-bold tracking-wider mb-1">
                                            ID da Venda
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-semibold text-slate-900">
                                                {itemPedido.idVenda ?? "-"}
                                            </span>
                                            {itemPedido.idVenda !== undefined && (
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(String(itemPedido.idVenda));
                                                        alert("ID da venda copiado!");
                                                    }}
                                                    className="p-1 text-blue-600 hover:bg-blue-200 rounded transition-all"
                                                    title="Copiar ID da venda"
                                                >
                                                    <i className="pi pi-copy text-sm"></i>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="block text-xs uppercase text-blue-600 font-bold tracking-wider mb-1">
                                            ID do Cliente
                                        </span>
                                        <span className="text-slate-800 font-medium text-base">
                                            {itemPedido.idCliente ?? "-"}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="block text-xs uppercase text-blue-600 font-bold tracking-wider mb-1">
                                            Quantidade
                                        </span>
                                        <p className="text-slate-700 font-medium leading-relaxed text-base bg-white p-3 rounded-lg border border-blue-200">
                                            {itemPedido.quantidade_produto ?? "0"}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-l-4 border-orange-500 shadow-sm hover:shadow-md transition-shadow">
                                <h2 className="text-lg font-bold text-orange-900 flex items-center gap-2 mb-5">
                                    <i className="pi pi-chart-bar text-orange-600 text-xl"></i>
                                    Valores e Estoque
                                </h2>

                                <div className="flex flex-col gap-6">
                                    <div className="bg-white p-4 rounded-lg border-2 border-emerald-200">
                                        <span className="block text-xs uppercase text-orange-600 font-bold tracking-wider mb-1">
                                            Preço Unitário
                                        </span>
                                        <span className="text-emerald-600 font-bold text-2xl">
                                            {Utilitario.formatarParaReal(Number(itemPedido.preco_unitario ?? 0))}
                                        </span>
                                        <span className="block text-xs text-emerald-500 mt-1">
                                            Valor por unidade
                                        </span>
                                    </div>

                                    <div>
                                        <span className="block text-xs uppercase text-orange-600 font-bold tracking-wider mb-2">
                                            Quantidade disponível
                                        </span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-slate-900">
                                                {quantidadeDisponivel}
                                            </span>
                                            <span className="text-slate-600 text-sm">
                                                {quantidadeDisponivel === 1 ? "unidade" : "unidades"}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="block text-xs uppercase text-orange-600 font-bold tracking-wider mb-2">
                                            Situação
                                        </span>
                                        <span
                                            className={`inline-flex items-center gap-2 mt-1 px-4 py-2 rounded-full text-sm font-semibold ${
                                                estoqueBaixo
                                                    ? "bg-red-100 text-red-700 border border-red-300"
                                                    : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                                            }`}
                                        >
                                            <i className={estoqueBaixo ? "pi pi-exclamation-circle" : "pi pi-check-circle"}></i>
                                            {estoqueBaixo ? "Quantidade crítica" : "Quantidade normal"}
                                        </span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(`/atualizar/itemPedido/${itemPedido.idVenda}`)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >
                        <i className="pi pi-pencil"></i>
                        Editar Item
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/lista/item-pedido")}
                        className="flex-1 bg-white border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 px-4 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >
                        <i className="pi pi-arrow-left"></i>
                        Voltar à Lista
                    </button>
                </div>
            </div>

            <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </main>
    );
}

export default DetalhesItemPedido;
