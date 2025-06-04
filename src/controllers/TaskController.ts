//MODEL
import {Task} from "../models/Task";

import { Op } from "sequelize";

// LISTAGEM DE TAREFAS

const tasks = async (req:any, res:any) => {

  try {  

    const {id} = req.params;
    const {status} = req.query;

    const userId = req.user.id;
    
    if (id) {

      const tarefa = await Task.findAll({where:{
        id:id,
        userId:userId 
      }});

      if (!tarefa.length) {
        return res.status(404).json({ message: "Tarefa não encontrada ou não pertence ao Usúario" });
      }

      return res.json(tarefa);
    }

    var condicao = {
      where: { status: { [Op.ne]: "inativo"},userId:userId }
    }

    if(status){
      condicao =  {where:{ status: status,userId:userId } }
    }

    const tarefas = await Task.findAll(condicao);
    
    res.json(tarefas);

  } catch (error) {

    console.error("Erro ao listar tarefas:", error);
    res.status(500).json({ message: "Erro ao listar tarefas" });
  }
};

// CADASTRO DE TAREFAS

const createTask = async (req:any, res:any) => {
   
 try {

  const {description,title,dueDate} = req.body;
  const {id} = req.params;

  const status = "pending";

  const userId = req.user.id;

  if(id){

      var tarefa:any = await Task.findOne({where:{
        id:id,
        userId:userId 
      }});

      if (!tarefa) {
        return res.status(404).json({ message: "Tarefa não encontrada ou não pertence ao Usúario" });
      }

    await tarefa.update({ title,description,dueDate});
    res.status(200).json({ message: "Tarefa Atualizada com Sucesso!" });

  }else{
    await Task.create({ title,description,userId,dueDate,status });
    res.status(200).json({ message: "Tarefa registrada com Sucesso!" });
  }  
}catch (error) {
    console.error("Erro no Cadastro da Task:", error);
    res.status(500).json({ message: "Erro no Cadastro da Task" });
  }
};


// FINALIZAR TAREFAS

const completeTask = async (req:any, res:any) => {
  
  try{
    const {id} = req.params;
    const status = "completed";

    if(id > 0){
      const tarefa:any = await Task.findByPk(id);
      await tarefa.update({ status });
      res.status(200).json({ message: "Tarefa Finalizada com Sucesso!" });
    }else{
      res.status(404).json({ message: "Não foi encontrado ID!" });
    }  
  }catch (error) {
      console.error("Erro ao tentar Finalizar Task:", error);
      res.status(500).json({ message: "Erro ao tentar Finalizar Task" });
  }
};

// EXCLUIR TAREFAS

const deleteTask = async (req:any, res:any) => {

  try{
    const {id} = req.params;
    const status = "inactive";
    const userId = req.user.id;

    if(id > 0){
      const tarefa = await Task.findOne({where:{
        id:id,
        userId:userId 
      }});

      if (!tarefa) {
        return res.status(404).json({ message: "Tarefa não encontrada ou não pertence ao Usúario" });
      }
      
      await tarefa.update({ status });
      res.status(200).json({ message: "Tarefa Excluida com Sucesso!" });
    }else{
      res.status(404).json({ message: "Não foi encontrado ID!" });
    }  
  }catch (error) {
      console.error("Erro ao tentar Deletar a Task:", error);
      res.status(500).json({ message: "Erro ao tentar Deletar a Task" });
  }
};

export {
  tasks,
  createTask,
  deleteTask,
  completeTask
};