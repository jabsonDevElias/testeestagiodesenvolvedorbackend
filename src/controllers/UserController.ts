import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//MODEL

import {User} from "../models/User";

const generateToken = (user: { email: string; id: number }) => {
    const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET não está definido no arquivo .env");
  }
  return jwt.sign({ email: user.email,id:user.id }, secret, { expiresIn: "1h" });
};

// CADASTRO DE USUÁRIO

const registerUser = async (req:any, res:any) => {

  try { 
    const { email, password,name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name,email,password: hashedPassword });
    res.status(200).json({ message: "Usuário registrado com Sucesso!" });
  }catch (error) {
    console.error("Erro no cadastro de Usuário:", error);
    res.status(500).json({ message: "Erro no cadastro de Usuário" });
  }
};

// LOGIN
const login = async (req:any, res:any) => {

  try {

    const { email, password } = req.body;

    const user:any = await User.findOne({ where: { email } });

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
    login,
    registerUser
}