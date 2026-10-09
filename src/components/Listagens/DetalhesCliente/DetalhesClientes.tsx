import { useEffect, useState, type JSX } from "react";
import ClienteRequests from "../../../fetch/ClienteRequest";
import type { ClienteDTO } from "../../../dto/ClienteDTO";
import { useNavigate } from "react-router-dom";

interface DetalhesClienteProps {
    idCliente: number;
}

function DetalhesClientes({ idCliente }: DetalhesClienteProps): JSX.Element {
    const [cliente, setCliente] = useState<ClienteDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);

            try {
                const dados = await ClienteRequests.obterClientePorId(idCliente);

                if (dados) {
                    setCliente(dados);
                } else {
                    setError("Cliente não encontrado.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes do cliente:", err);
                setError("Ocorreu um erro ao buscar as informações do cliente.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [idCliente]);

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

    if (error || !cliente) {
        return (
            <main className="bg-gray-200 flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="text-red-500 text-5xl mb-4">
                        <i className="pi pi-exclamation-triangle"></i>
                    </div>

                    <h2 className="text-xl font-bold text-slate-800 mb-2">
                        Cliente não encontrado
                    </h2>

                    <p className="text-slate-500 mb-6">
                        {error || "Não foi possível encontrar este cliente."}
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/lista/clientes")}
                        className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-md font-bold transition-all"
                    >
                        Voltar para Clientes
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-gradient-to-b from-blue-50 to-gray-100 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">
            <div className="w-full max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl shadow-lg p-6 sm:p-8 text-white animate-fade-in">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
                                <i className="pi pi-user"></i>
                                {cliente.nome}
                            </h1>
                            <p className="text-blue-100 text-sm">
                                Visualizando detalhes completos do cliente.
                            </p>
                        </div>

                        <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                                cliente.idCliente
                                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50"
                                    : "bg-red-500 text-white shadow-lg shadow-red-500/50"
                            }`}
                        >
                            <i className={cliente.idCliente ? "pi pi-check-circle" : "pi pi-times-circle"}></i>
                            {cliente.idCliente ? "Ativo" : "Inativo"}
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-b-2xl shadow-lg p-5 sm:p-8 animate-fade-in-delayed">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-xl border border-sky-200">
                            <div>
                                <span className="text-xs font-semibold text-sky-600 uppercase tracking-widest block mb-1">
                                    Código Identificador
                                </span>
                                <span className="text-lg font-bold text-sky-900">
                                    {cliente.idCliente ?? "-"}
                                </span>
                            </div>

                            <button
                                onClick={() => {
                                    if (cliente.idCliente !== undefined) {
                                        navigator.clipboard.writeText(String(cliente.idCliente));
                                        alert("ID do cliente copiado!");
                                    }
                                }}
                                className="px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-bold transition-all"
                                title="Copiar ID do cliente"
                            >
                                <i className="pi pi-copy mr-1"></i> Copiar
                            </button>
                        </div>

                        <hr className="border-t border-gray-200 my-6" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
                                <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-5">
                                    <i className="pi pi-user text-blue-600 text-xl"></i>
                                    Informações do Cliente
                                </h2>

                                <div className="flex flex-col gap-6">
                                    <div>
                                        <span className="block text-xs uppercase text-blue-600 font-bold tracking-wider mb-1">
                                            ID do Cliente
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-semibold text-slate-900">
                                                {cliente.idCliente ?? "-"}
                                            </span>
                                            {cliente.idCliente !== undefined && (
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(String(cliente.idCliente));
                                                        alert("ID copiado!");
                                                    }}
                                                    className="p-1 text-blue-600 hover:bg-blue-200 rounded transition-all"
                                                    title="Copiar ID"
                                                >
                                                    <i className="pi pi-copy text-sm"></i>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="block text-xs uppercase text-blue-600 font-bold tracking-wider mb-1">
                                            Nome
                                        </span>
                                        <span className="text-slate-800 font-medium text-base">
                                            {cliente.nome || "Nome não informado."}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="block text-xs uppercase text-blue-600 font-bold tracking-wider mb-1">
                                            CPF
                                        </span>
                                        <p className="text-slate-700 font-medium leading-relaxed text-base bg-white p-3 rounded-lg border border-blue-200">
                                            {cliente.cpf || "Nenhum CPF informado."}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-l-4 border-orange-500 shadow-sm hover:shadow-md transition-shadow">
                                <h2 className="text-lg font-bold text-orange-900 flex items-center gap-2 mb-5">
                                    <i className="pi pi-id-card text-orange-600 text-xl"></i>
                                    Identificação
                                </h2>

                                <div className="flex flex-col gap-6">
                                    <div className="bg-white p-4 rounded-lg border-2 border-emerald-200">
                                        <span className="block text-xs uppercase text-orange-600 font-bold tracking-wider mb-1">
                                            Nome completo
                                        </span>
                                        <span className="text-emerald-600 font-bold text-2xl">
                                            {cliente.nome || "-"}
                                        </span>
                                        <span className="block text-xs text-emerald-500 mt-1">
                                            Nome principal do cliente
                                        </span>
                                    </div>

                                    <div>
                                        <span className="block text-xs uppercase text-orange-600 font-bold tracking-wider mb-2">
                                            CPF cadastrado
                                        </span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-slate-900">
                                                {cliente.cpf || "-"}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="block text-xs uppercase text-orange-600 font-bold tracking-wider mb-1">
                                            Status
                                        </span>
                                        <span className="text-slate-700 font-medium">
                                            {cliente.idCliente ? "Cliente ativo" : "Cliente inativo"}
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
                        onClick={() => navigate(`/atualizar/cliente/${cliente.idCliente}`)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >
                        <i className="pi pi-pencil"></i>
                        Editar Cliente
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/lista/clientes")}
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

export default DetalhesClientes;
