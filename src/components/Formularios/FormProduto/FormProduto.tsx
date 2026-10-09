import { useState, type JSX } from "react";

import type { ProdutoDTO } from "../../../dto/ProdutoDTO";

interface FormProdutoProps {
    produtos?: ProdutoDTO[];
    onSuccess?: () => void;
}

function FormProduto({ produtos = [], onSuccess }: FormProdutoProps): JSX.Element {
    const [form, setForm] = useState<ProdutoDTO>({
        descricao: "",
        preco: 0,
        quantidade_estoque: 0,
        quantidade_minima: 0,
    });

    const handleChange = (campo: keyof ProdutoDTO, valor: string) => {
        setForm((prev) => ({
            ...prev,
            [campo]: campo === "descricao" ? valor : Number(valor),
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (onSuccess) onSuccess();
        console.log("Produto cadastrado:", form, produtos.length);
    };

    return (
        <main style={{ padding: "32px 20px", background: "#f8fafc", minHeight: "60vh" }}>
            <form onSubmit={handleSubmit} style={{ maxWidth: 620, margin: "0 auto", background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)" }}>
                <h2 style={{ marginBottom: 20 }}>Cadastro de Produto</h2>

                <label style={{ display: "block", marginBottom: 12 }}>
                    <span style={{ display: "block", marginBottom: 6 }}>Descrição</span>
                    <input
                        type="text"
                        value={form.descricao}
                        onChange={(e) => handleChange("descricao", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1px solid #cbd5e1" }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: 12 }}>
                    <span style={{ display: "block", marginBottom: 6 }}>Preço</span>
                    <input
                        type="number"
                        step="0.01"
                        value={form.preco}
                        onChange={(e) => handleChange("preco", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1px solid #cbd5e1" }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: 12 }}>
                    <span style={{ display: "block", marginBottom: 6 }}>Quantidade em Estoque</span>
                    <input
                        type="number"
                        value={form.quantidade_estoque}
                        onChange={(e) => handleChange("quantidade_estoque", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1px solid #cbd5e1" }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: 16 }}>
                    <span style={{ display: "block", marginBottom: 6 }}>Quantidade Mínima</span>
                    <input
                        type="number"
                        value={form.quantidade_minima}
                        onChange={(e) => handleChange("quantidade_minima", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1px solid #cbd5e1" }}
                    />
                </label>

                <button type="submit" style={{ background: "#0f172a", color: "#fff", border: "none", borderRadius: 10, padding: "0.85rem 1.2rem", fontWeight: 700, cursor: "pointer" }}>
                    Salvar produto
                </button>
            </form>
        </main>
    );
}

export default FormProduto;
