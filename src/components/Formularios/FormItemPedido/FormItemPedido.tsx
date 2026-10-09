import { useState, type JSX } from "react";

import type { ItemPedidoDTO } from "../../../dto/ItemPedidoDTO";

interface FormItemPedidoProps {
    itensPedido?: ItemPedidoDTO[];
    onSuccess?: () => void;
}

function FormItemPedido({ itensPedido = [], onSuccess }: FormItemPedidoProps): JSX.Element {
    const [form, setForm] = useState<ItemPedidoDTO>({
        idVenda: undefined,
        idCliente: undefined,
        quantidade_produto: 0,
        preco_unitario: 0,
    });

    const handleChange = (campo: keyof ItemPedidoDTO, valor: string) => {
        setForm((prev) => ({
            ...prev,
            [campo]: Number(valor),
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (onSuccess) onSuccess();
        console.log("Item do pedido cadastrado:", form, itensPedido.length);
    };

    return (
        <main style={{ padding: "32px 20px", background: "#f8fafc", minHeight: "60vh" }}>
            <form onSubmit={handleSubmit} style={{ maxWidth: 620, margin: "0 auto", background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)" }}>
                <h2 style={{ marginBottom: 20 }}>Cadastro de Item do Pedido</h2>

                <label style={{ display: "block", marginBottom: 12 }}>
                    <span style={{ display: "block", marginBottom: 6 }}>ID da Venda</span>
                    <input
                        type="number"
                        value={form.idVenda ?? ""}
                        onChange={(e) => handleChange("idVenda", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1px solid #cbd5e1" }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: 12 }}>
                    <span style={{ display: "block", marginBottom: 6 }}>ID do Cliente</span>
                    <input
                        type="number"
                        value={form.idCliente ?? ""}
                        onChange={(e) => handleChange("idCliente", e.target.value)}
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
                    Salvar item
                </button>
            </form>
        </main>
    );
}

export default FormItemPedido;
