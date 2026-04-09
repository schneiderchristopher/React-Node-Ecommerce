# Documentação da API - ConnectDash (E-commerce & Integração)

## Visão Geral
Essa é uma API simplificada de ECommerce, não possuí authentication e authorization.

**Base URL Local:** `http://localhost:3000/api`

---

## 1. Catálogo de Produtos

### `GET /products`
Retorna a lista de produtos.

**Parâmetros de Query:** Nenhum.

**Respostas:**
- `200 OK`
```json
[
  {
    "name": "Produto A",
    "description": "Descrição A",
    "price": 25.90,
    "imageUrl": "exampleimage.com.br"
  },
  {
    "name": "Produto A",
    "description": "Descrição A",
    "price": 25.90,
    "imageUrl": "exampleimage.com.br"
  },
]
```
### `PUT /products`
Atualiza um produto.

**Parâmetros de Query:** Id do produto.

**Respostas:**
- `204 NO CONTENT`

### `DELETE /products`
Deleta um produto.

**Parâmetros de Query:** Id do produto.

**Respostas:**
- `200 OK`
```json
{
    "message": "Produto deletado"
}
```

---

## 2. Gestão de Pedidos (Checkout)

### `POST /orders`
Cria um novo pedido no sistema. A data de entrega por padrão é o dia de hoje mais 7 dias.

**Headers:**
- `Content-Type: application/json`

**Body da Requisição:**
```json
{
  "client_id": "cliente@teste.com",
  "itens": [
    {
      "product_id": 1,
      "quantity": 2
    }
  ]
}
```

**Respostas:**
- `201 Created`
```json
{
  "sucesso": true,
  "dados": {
    "product_id": 5001,
    "status": "confirmado",
    "mensagem": "Pedido registrado com sucesso no banco de dados."
  }
}
```

---

## 3. Fluxo de Integração (Admin / Dashboard)

### `GET /orders`
Retorna ordens pendentes e completas. Executa um `INNER JOIN` complexo no banco de dados para agregar as informações do pedido, do cliente e dos itens em um único objeto JSON estruturado.

**Parâmetros de Query:** Nenhum.

**Respostas:**
- `200 OK`
```json
{
  "dados": [
    {
      "id": 5001,
      "delivery_date": "2024-01-25",
      "total": 51.80,
      "client_id": "cliente@teste.com",
      "itens": [
        {
          "product_id": 1,
          "quantity": 2,
        }
      ]
    }
  ]
}
```

### `PATCH /orders/{id}/confirm`
Confirma uma ordem.

**Parâmetros de Query:** Nenhum.

**Respostas:**
- `204 NO CONTENT`

---

## Estrutura do Banco de Dados (SQLite)
A API interage com o seguinte schema normalizado:
- **`produtos`**: Catálogo de itens.
- **`pedidos`**: Cabeçalho da venda (status, data, totais).
