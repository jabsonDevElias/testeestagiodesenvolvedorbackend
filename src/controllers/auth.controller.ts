import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//MODELS
const User = require("../models/User");
const Tarefas = require("../models/Tarefas");
const { Op } = require("sequelize");

const generateToken = (user:any) => {
    const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET não está definido no arquivo .env");
  }
  return jwt.sign({ email: user.email,id:user.id }, secret, { expiresIn: "1h" });
};

// CADASTRO DE USUÁRIO

const cadastrausuario = async (req:any, res:any) => {
  const { email, password,nome } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const novoUsuario = await User.create({ nome,email,password: hashedPassword });
  res.json({ message: "Usuário registrado com Sucesso!" });
};

// LISTAGEM DE TAREFAS

const tasks = async (req:any, res:any) => {
  const {id} = req.params;
  const {status} = req.query;

  try {
    
    if (id) {

      const tarefa = await Tarefas.findByPk(id);

      if (!tarefa) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }

      return res.json(tarefa);
    }

    var condicao = {
      where: { status: { [Op.ne]: "inativo"}}
    }

    if(status){
      condicao =  {where:{ status: status }}
    }

    const tarefas = await Tarefas.findAll(condicao);
    
    res.json(tarefas);

  } catch (error) {

    console.error("Erro ao listar tarefas:", error);
    res.status(500).json({ message: "Erro ao listar tarefas" });
  }
};

// CADASTRO DE TAREFAS

const createTask = async (req:any, res:any) => {

  const {descricao,nome} = req.body;
  const {id} = req.params;

  const status = "pending";
   
  const idUser = req.user.id;

  if(id){
    const tarefa = await Tarefas.findByPk(id);
    await tarefa.update({ nome,descricao,status });
    res.json({ message: "Tarefa Atualizada com Sucesso!" });
  }else{
    const novaTarefa= await Tarefas.create({ nome,descricao,idUser,status });
    res.json({ message: "Tarefa registrada com Sucesso!" });
  }  
};


// EXCLUIR TAREFAS

const deleteTask = async (req:any, res:any) => {
  const {id} = req.params;
  const status = "inativo";

  if(id > 0){
    const tarefa = await Tarefas.findByPk(id);
    await tarefa.update({ status });
    res.status(200).json({ message: "Tarefa Excluida com Sucesso!" });
  }else{
    res.json({ message: "Não foi encontrado ID!" });
  }  
};

// LOGIN
const login = async (req:any, res:any) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = generateToken(user);

    res.json({token});
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export {
  cadastrausuario,
  login,
  tasks,
  createTask,
  deleteTask
};