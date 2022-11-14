<div align="center">
  <h1>BOARDCAMP</h1>
  <br>
  - Back-end de uma aplicação web para gerenciamento de uma loja que lida com aluguéis de jogos de tabuleiro. 
  <br>
  <br>
</div>
<br>
  
# Funcionalidades
- Cadastro de clientes
- Cadastro de categorias 
- Cadastro de jogos
- Cadastro e atualização de clientes
- Cadastro, atualização, finalização e exclusão de aluguéis
- Paginação 

# Tecnologias utilizadas
- Node.js
- EXPRESS
- CORS
- DAYJS
- DOTENV
- JOI
- PostgreSQL
- GIT
- GITHUB
- VSCODE
- LINUX

# Documentação 
Para listar todas as categorias:
- GET: /categories
<br>

Para criar uma categoria:
- POST /categories
```json
 {
  "name": "nome da categoria" //string
 }
```
Para listar todos os jogos:
- GET: /games

Para criar um jogo:
- POST: /games
```json
{
  "name": "nome do jogo", //string
  "image": "url da imagem", //string
  "stockTotal": "numero de stock", //number
  "categoryId": "id da categoria", //number
  "pricePerDay": "preço por dia", //number
}
```

Para listar todos os clientes:
- GET: /customers

Para consultar um cliente através do id:
- GET: /customers/:id

Para cadastrar um cliente:
- POST: /customers
```json
{
  "name": "nome do cliente", //string
  "phone": "telefone de contato", //string
  "cpf": "número do cpf", //string
  "birthday": "data de aniversário" //date
}
```

Para atualizar um cliente através do id:
- PUT:  /customers/:id
```json
{
  "name": "nome do cliente", //string
  "phone": "telefone de contato", //string
  "cpf": "número do cpf", //string
  "birthday": "data de aniversário" //date
}
```

Para listar todos os aluguéis:
- GET: /rentals

Para criar um aluguel:
- POST: /rentals
```json
{
  "customerId": "id do cliente", //number
  "gameId": "id do jogo", //number
  "daysRented": "número de dias do aluguel" //number
}
```

Para finalizar um aluguel através do id:
- POST: /rentals/:id/return

Para excluir um aluguel através do id:
- DELETE: /rentals/:id

# Como rodar
1. Clone esse repositório
2. Instale as dependências:
```bash
npm i
```
3. Configure o .env
4. Crie o banco de dados com auxílio do dump.sql
5. Rode o projeto:
```bash
node ./src/server.js
```


<br>