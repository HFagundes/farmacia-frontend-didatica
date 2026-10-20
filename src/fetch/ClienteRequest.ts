import type { ClienteDTO } from "../dto/ClienteDTO";

class ClienteRequests {

    private endpoint: string;

    constructor() {
        this.endpoint = "https://farmacia-backend-didatica-434y.onrender.com/api/clientes";
    }

    private normalizarCliente(cliente: any): ClienteDTO {
        return {
            idCliente: cliente.idCliente || cliente.id_cliente,
            nome: cliente.nome,
            cpf: cliente.cpf
    
        };
    }

    async criar(cliente: ClienteDTO) {
        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                this.endpoint,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(cliente)
                }
            );

            if (!response.ok) {
                const corpo = await response.text();
                let mensagem = "Erro ao cadastrar cliente.";

                if (corpo) {
                    try {
                        const dados = JSON.parse(corpo) as {
                            message?: string;
                            error?: string;
                            detail?: string;
                        };
                        mensagem = dados.message ?? dados.error ?? dados.detail ?? corpo;
                    } catch {
                        mensagem = corpo;
                    }
                }

                throw Object.assign(new Error(mensagem), {
                    status: response.status,
                });
            }

            return true;

        } catch (error) {
            console.error("Erro na requisição de cadastro de cliente:", error);
            throw error;
        }
    }

    async listar() {
        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                this.endpoint,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const dados = await response.json();
            
            if (Array.isArray(dados)) {
                return dados.map((cliente: any) => this.normalizarCliente(cliente));
            }
            
            return [];

        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async obterClientePorId(id: number) {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${this.endpoint}/${id}`,
                {
                    method: "GET",

                    headers: {
                        "Content-Type": "application/json",
                        ...(token
                            ? {
                                Authorization: `Bearer ${token}`
                            }
                            : {})
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Cliente não encontrado.");
            }

            const dados = await response.json();
            return this.normalizarCliente(dados);

        } catch (error) {

            console.error(
                "Erro ao buscar cliente por ID:",
                error
            );

            throw error;
        }
    }
}

export default new ClienteRequests();