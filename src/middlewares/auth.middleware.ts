import jwt from "jsonwebtoken";

const authMiddleware = (req:any, res:any, next:any) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) return res.status(401).json({ message: "Acesso negado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token inválido" });
  }
};

export {authMiddleware};