import type {ItemPedidoDTO} from "../dto/ItemPedidoDTO";

class ItemPedidoRequests {

    private endpoint: string;

    constructor() {
        this.endpoint = "https://farmacia-backend-didatica-434y.onrender.com/api/item-pedido";
    }

    private normalizarItemPedido(itemPedido: any): ItemPedidoDTO {
        return {
            
           idVenda: itemPedido.idVenda || itemPedido.id_venda,
           idCliente : itemPedido.idCliente || itemPedido.id_cliente,
           quantidade_produto: itemPedido.quantidade_produto || itemPedido.quantidade_produto,
              preco_unitario: itemPedido.preco_unitario || itemPedido.preco_unitario
    
        };
    }

    async criar(ItemPedido: ItemPedidoDTO) {
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
                    body: JSON.stringify(ItemPedido)
                }
            );

            if (!response.ok) {
                const corpo = await response.text();
                let mensagem = "Erro ao cadastrar produto.";

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
            console.error("Erro na requisição de cadastro:", error);
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
                return dados.map((itemPedido: any) => this.normalizarItemPedido(itemPedido));
            }
            
            return [];

        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async obterItemPedidoPorId(id: number) {

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
                throw new Error("Produto não encontrado.");
            }

            const dados = await response.json();
            return this.normalizarItemPedido(dados);

        } catch (error) {

            console.error(
                "Erro ao buscar pedido por ID:",
                error
            );

            throw error;
        }
    }
}

export default new ItemPedidoRequests();