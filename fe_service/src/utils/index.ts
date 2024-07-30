import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { APP_SECRET, SMTP } from "../config";
import nodemailer from "nodemailer";

//Utility functions
export const generateSalt = async () => {
  return bcrypt.genSalt();
};

export const generatePassword = async (password: any, salt: any) => {
  return bcrypt.hash(password, salt);
};

export const validatePassword = async (
  enteredPassword: any,
  savedPassword: any,
  salt: any
) => {
  return (await generatePassword(enteredPassword, salt)) === savedPassword;
};

export const generateSignature = async (payload: any) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const tranportCreate = async () => {
  return nodemailer.createTransport({
    host: SMTP.host,
    port: 587,
    secure: SMTP.secure,
    auth: {
      user: SMTP.user,
      pass: SMTP.password,
    },
  });
};

export const validateSignature = async (req: any) => {
  try {
    const signature = req.get("Authorization");
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const resWarningData = (message: string) => {
  return {
    success: false,
    message,
  };
};

export const errorResData = (success: false, message: string, data: any) => {
  return { success, message, data };
};

 

