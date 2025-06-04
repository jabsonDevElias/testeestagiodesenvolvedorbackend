
# 📋 API de Tarefas

Esta é uma API para gerenciamento de tarefas com autenticação JWT. Os usuários podem se registrar, fazer login e criar, editar e excluir tarefas.

---

## 🛠️ Instruções de Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seuusuario/seurepositorio.git
   cd seurepositorio
   ```

2. **Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:**
   ```env
   DB_USER=postgres
   DB_HOST=postgres
   DB_NAME=tarefas
   DB_PASS=1234
   DB_PORT=5432
   JWT_SECRET=testededesenvolvedorfullstack
   ```

3. **Inicie a aplicação com Docker Compose:**
   ```bash
   docker-compose up --build
   ```

4. A API estará disponível em: `http://localhost:5000`

---

## 🚀 Rotas da API

### 🔐 Autenticação

#### 📩 POST `/auth/register`  
Registra um novo usuário.

**Body (JSON):**
```json
{
  "name": "João",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**🗨️ RESPOSTA:**
```json
{
  "message": "Usuário registrado com Sucesso!"
}
```

**Erros Possíveis:**
- 400: Faltam campos para a autenticação
- 401: Usuário não encontrado ou senha incorreta
- 500: Erro interno do servidor

#### 📩 POST `/auth/login`  
Autentica o usuário e retorna um token JWT.

**Body (JSON):**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**🗨️ RESPOSTA:**
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

#### 📩 POST `/tasks`  

**Body (JSON):**
```json
{
  "title":"Fazer compras",
  "description":"comprar leite, pão e café",
  "dueDate": "2025-12-01"
}
```

**🗨️ RESPOSTA:**
```json
{
  "message": "Tarefa registrada com Sucesso!"
}
```

**Erros Possíveis:**
- 401: Acesso negado
- 403: Token inválido
- 500: Erro interno do servidor ou os campos estão errados

#### 📩 PUT `/tasks/:id`  
Passa o Id da Task que você quer alterar.

**Body (JSON):**
```json
{
  "description":"comprar leite, pão, café e bolacha"
}
```

**🗨️ RESPOSTA:**
```json
{
  "message": "Tarefa Atualizada com Sucesso!"
}
```

**Erros Possíveis:**
- 401: Acesso negado
- 403: Token inválido
- 500: Erro interno do servidor ou os campos estão errados

#### 📩 GET `/tasks/:id` 
Ou use `/tasks/` para listar todas as tasks.

**🗨️ RESPOSTA:**
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
- 404: Tarefa não Encontrada

#### 📩 DELETE `/tasks/:id`  
Rota para excluir uma task. Basta passar o Id como parâmetro.

**🗨️ RESPOSTA:**
```json
{
  "message": "Tarefa Excluída com Sucesso!"
}
```

**Erros Possíveis:**
- 401: Acesso negado
- 403: Token inválido
- 404: ID não encontrado

#### 📩 PATCH `/tasks/:id/complete`  
Rota para completar uma task. Basta passar o Id como parâmetro.

**🗨️ RESPOSTA:**
```json
{
  "message": "Tarefa Finalizada com Sucesso!"
}
```

**Erros Possíveis:**
- 401: Acesso negado
- 403: Token inválido
- 404: ID não encontrado
