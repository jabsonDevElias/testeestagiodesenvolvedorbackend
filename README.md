# 📋 API de Tarefas

Esta é uma API para gerenciamento de tarefas com autenticação JWT. Os usuários podem se registrar, fazer login e criar, editar e excluir tarefas.

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

Erros Possíveis:

400: Falta campos para a autenticação

401: Usuário não encontrado ou senha incorreta

500: Erro interno do servidor

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

Erros Possíveis:

400: Falta campos para a autenticação

401: Usuário não encontrado ou senha incorreta

500: Erro interno do servidor






