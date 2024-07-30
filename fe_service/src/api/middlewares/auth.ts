import { validateSignature } from "../../utils";

export const userAuth = async (req: any, res: any, next: any) => {
  const isAuthorized = await validateSignature(req);
  if (isAuthorized) {
    return next();
  }

  return res.status(401).json({ success: false, message: "Not Authorized" });
};                                          