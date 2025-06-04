
# 📋 API de Tarefas

Esta é uma API para gerenciamento de tarefas com autenticação JWT. Os usuários podem se registrar, fazer login e criar, editar e excluir tarefas.

---

## 🛠️ Instruções de Instalação

Você pode rodar este projeto de duas formas:

### ✅ 1. Sem Docker

⚙️ Requisitos:

- Node.js (v18+)
- PostgreSQL (com banco criado e credenciais configuradas no `.env`)

📦 Instale as dependências:

```bash
npm install
```

Clone o repositório:

```bash
git clone https://github.com/jabsonDevElias/testeestagiodesenvolvedorbackend.git
cd seurepositorio
```

### ✅ 2. Com Docker Compose

Inicie a aplicação com Docker Compose:

```bash
docker-compose up --build
```

A API estará disponível em: `http://localhost:5000`

Você pode fazer testes da aplicação em : `http://localhost:5000/api-doc` ou usar o collection 📄 [Baixar Collection](link_do_postman_collection_aqui)

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript no servidor.
- **TypeScript** – Superset do JavaScript com tipagem estática.
- **Express** – Framework web para criação das rotas.
- **PostgreSQL** – Banco de dados relacional utilizado.
- **Sequelize** – ORM para manipulação do banco de dados com PostgreSQL.
- **JWT (JSON Web Token)** – Autenticação segura por token.
- **Swagger** – Documentação interativa da API.
- **Docker + Docker Compose** – Containerização dos serviços (API e banco de dados).

> 🧑‍💻 Nota: Esta aplicação foi construída com Node.js + TypeScript e Express, por opção pessoal e por ainda não possuir experiência com NestJS.

---

## 🚀 Rotas da API

### 🔐 Autenticação

#### 📩 POST /auth/register

Registra um novo usuário.

**Body (JSON):**

```json
{
  "name": "João",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta:**

```json
{
  "message": "Usuário registrado com Sucesso!"
}
```

**Erros Possíveis:**

- 400: Faltam campos para a autenticação
- 401: Usuário não encontrado ou senha incorreta
- 500: Erro interno do servidor

---

#### 📩 POST /auth/login

Autentica o usuário e retorna um token JWT.

**Body (JSON):**

```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta:**

```json
{
  "token": "JWT_TOKEN"
}
```

Depois que o token for criado, você deverá usá-lo nas chamadas que exigem autenticação.

**Erros Possíveis:**

- 401: Usuário não encontrado ou senha incorreta
- 500: Erro interno do servidor ou os campos estão errados

---

### 🧾 Tarefas

As rotas abaixo exigem autenticação via JWT.  
Envie o token no header: `Authorization: Bearer SEU_TOKEN`

---

#### 📩 POST /tasks

Cria uma nova tarefa.

**Body (JSON):**

```json
{
  "title":"Fazer compras",
  "description":"comprar leite, pão e café",
  "dueDate": "2025-12-01"
}
```

**Resposta:**

```json
{
  "message": "Tarefa registrada com Sucesso!"
}
```

**Erros Possíveis:**

- 401: Acesso negado
- 403: Token inválido
- 500: Erro interno do servidor ou os campos estão errados

---

#### 📩 PUT /tasks/:id

Atualiza uma tarefa pelo ID.

**Body (JSON):**

```json
{
  "description":"comprar leite, pão, café e bolacha"
}
```

**Resposta:**

```json
{
  "message": "Tarefa Atualizada com Sucesso!"
}
```

**Erros Possíveis:**

- 401: Acesso negado
- 403: Token inválido
- 500: Erro interno do servidor ou os campos estão errados

---

#### 📩 GET /tasks/:id

Busca uma tarefa pelo ID.  
Ou use `/tasks/` para listar todas as tarefas.

**Resposta:**

```json
[
  {
    "id": 2,
    "title": "Estudar API REST",
    "description": "Ler documentação e fazer testes",
    "userId": 1,
    "dueDate": "2025-12-10T00:00:00.000Z",
    "status": "in_progress",
    "createdAt": "2025-06-01T13:00:00.000Z",
    "updatedAt": "2025-06-01T14:00:00.000Z"
  }
]
```

**Erros Possíveis:**

- 401: Acesso negado
- 403: Token inválido
- 404: Tarefa não encontrada ou não pertence ao Usuário

---

#### 📩 DELETE /tasks/:id

Exclui (inativa) uma tarefa pelo ID.

**Resposta:**

```json
{
  "message": "Tarefa Excluída com Sucesso!"
}
```

**Erros Possíveis:**

- 401: Acesso negado
- 403: Token inválido
- 404: Tarefa não encontrada ou não pertence ao Usuário
- 404: ID não encontrado

---

#### 📩 PATCH /tasks/:id/complete

Marca uma tarefa como concluída pelo ID.

**Resposta:**

```json
{
  "message": "Tarefa Finalizada com Sucesso!"
}
```

**Erros Possíveis:**

- 401: Acesso negado
- 403: Token inválido
- 404: ID não encontrado

---

## 📈 Melhorias Futuras

Ainda existem pontos que pretendo melhorar nesta API, como:

- Tornar as mensagens de retorno mais específicas e detalhadas para cada tipo de erro.
- Melhorar a padronização dos status HTTP.
- Adicionar paginação nas listagens de tarefas.

---
