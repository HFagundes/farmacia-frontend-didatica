import { useState, type JSX } from "react";

import type { ClienteDTO } from "../../../dto/ClienteDTO";

interface FormClienteProps {
    clientes?: ClienteDTO[];
    onSuccess?: () => void;
}

function FormCliente({ clientes = [], onSuccess }: FormClienteProps): JSX.Element {
    const [form, setForm] = useState<ClienteDTO>({
        nome: "",
        cpf: "",
    });

    const handleChange = (campo: keyof ClienteDTO, valor: string) => {
        setForm((prev) => ({
            ...prev,
            [campo]: valor,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (onSuccess) onSuccess();
        console.log("Cliente cadastrado:", form, clientes.length);
    };

    return (
        <main style={{ padding: "32px 20px", background: "#f8fafc", minHeight: "60vh" }}>
            <form onSubmit={handleSubmit} style={{ maxWidth: 620, margin: "0 auto", background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)" }}>
                <h2 style={{ marginBottom: 20 }}>Cadastro de Cliente</h2>

                <label style={{ display: "block", marginBottom: 12 }}>
                    <span style={{ display: "block", marginBottom: 6 }}>Nome</span>
                    <input
                        type="text"
                        value={form.nome}
                        onChange={(e) => handleChange("nome", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1px solid #cbd5e1" }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: 16 }}>
                    <span style={{ display: "block", marginBottom: 6 }}>CPF</span>
                    <input
                        type="text"
                        value={form.cpf ?? ""}
                        onChange={(e) => handleChange("cpf", e.target.value)}
                        style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: 10, border: "1px solid #cbd5e1" }}
                    />
                </label>

                <button type="submit" style={{ background: "#0f172a", color: "#fff", border: "none", borderRadius: 10, padding: "0.85rem 1.2rem", fontWeight: 700, cursor: "pointer" }}>
                    Salvar cliente
                </button>
            </form>
        </main>
    );
}

export default FormCliente;
