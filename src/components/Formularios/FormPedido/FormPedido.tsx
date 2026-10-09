import { useState, type JSX } from "react";

import type { PedidoDTO } from "../../../dto/PedidoDTO";

interface FormPedidoProps {
    pedidos?: PedidoDTO[];
    onSuccess?: () => void;
}

function FormPedido({ pedidos = [], onSuccess }: FormPedidoProps): JSX.Element {
    const [form, setForm] = useState<PedidoDTO>({
        idProduto: undefined,
        quantidade_produto: 0,
        preco_unitario: 0,
    });

    const handleChange = (campo: keyof PedidoDTO, valor: string) => {
        setForm((prev) => ({
            ...prev,
            [campo]: campo === "idProduto" ? Number(valor) : Number(valor),
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (onSuccess) onSuccess();
        console.log("Pedido cadastrado:", form, pedidos.length);
    };

    return (
        <main style={{ padding: "32px 20px", background: "#f8fafc", minHeight: "60vh" }}>
            <form onSubmit={handleSubmit} style={{ maxWidth: 620, margin: "0 auto", background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)" }}>
                <h2 style={{ marginBottom: 20 }}>Cadastro de Pedido</h2>

                <label style={{ display: "block", marginBottom: 12 }}>
                    <span style={{ display: "block", marginBottom: 6 }}>ID do Produto</span>
                    <input
                        type="number"
                        value={form.idProduto ?? ""}
                        onChange={(e) => handleChange("idProduto", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1px solid #cbd5e1" }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: 12 }}>
                    <span style={{ display: "block", marginBottom: 6 }}>Quantidade</span>
                    <input
                        type="number"
                        value={form.quantidade_produto}
                        onChange={(e) => handleChange("quantidade_produto", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1px solid #cbd5e1" }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: 16 }}>
                    <span style={{ display: "block", marginBottom: 6 }}>Preço Unitário</span>
                    <input
                        type="number"
                        step="0.01"
                        value={form.preco_unitario}
                        onChange={(e) => handleChange("preco_unitario", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1px solid #cbd5e1" }}
                    />
                </label>

                <button type="submit" style={{ background: "#0f172a", color: "#fff", border: "none", borderRadius: 10, padding: "0.85rem 1.2rem", fontWeight: 700, cursor: "pointer" }}>
                    Salvar pedido
                </button>
            </form>
        </main>
    );
}

export default FormPedido;
