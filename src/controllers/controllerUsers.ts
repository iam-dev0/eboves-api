import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  if (password === "eboves" && userName === "eboves") {
    res.send({
      status: "ok",
      currentAuthority: "admin",
    });
    return;
  }

  res.send({
    status: "error",
  });
};
