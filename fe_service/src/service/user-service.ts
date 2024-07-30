import {
  errorResData,
  generatePassword,
  generateSalt,
  generateSignature,
  resWarningData,
  tranportCreate,
  validatePassword,
} from "../utils";

import { message } from "../utils/message";
import { UserRepository } from "../database/repository/user-repository";
import { LoginRequest, SignupRequest } from "../input-type/auth";
import { SMTP, APP_SECRET } from "../config";
import jwt from "jsonwebtoken";

export class UserService {
  public repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async signUp(userInputs: SignupRequest) {
    try {
      const { email, password } = userInputs;
      const isExistingUser = await this.repository.findUser(email);
      if (isExistingUser) {
        return resWarningData(message.emailAlreadyExist);
      }
      // create salt
      let salt = await generateSalt();
      let userPassword = await generatePassword(password, salt);

      const existingCustomer = await this.repository.createUser({
        ...userInputs,

        password: userPassword,
        isActive: true,
        salt,
      });
      const token = await generateSignature({
        email: email,
        targetId: existingCustomer && existingCustomer.targetId,
        id: existingCustomer.id,
      });
      return {
        id: existingCustomer.id,
        token,
        roleId: existingCustomer.roleId,
      };
    } catch (err: any) {
      return errorResData(false, err.message, []);
    }
  }

  async signIn(userInputs: LoginRequest) {
    try {
      const { email, password } = userInputs;
      const existingCustomer = await this.repository.findUser(email);

      if (existingCustomer) {
        const validPassword = await validatePassword(
          password,
          existingCustomer.password,
          existingCustomer.salt
        );
        if (validPassword) {
          const token = await generateSignature({
            targetId: existingCustomer?.targetId,
            email: existingCustomer.email,
            id: existingCustomer.id,
          });
          return {
            success: true,
            id: existingCustomer.id,
            token,
            roleId: existingCustomer.roleId,
          };
        }
      }
      return errorResData(false, message.userNotFound, []);
    } catch (error: any) {
      return errorResData(false, error.message, []);
    }
  }

  async getProfile(id: string) {
    const existingCustomer = await this.repository.findUserById(id);
    existingCustomer.password = null;
    existingCustomer.salt = null;
    return existingCustomer;
  }

  async sendForgetMail(userInputs: LoginRequest) {
    try {
      const { email } = userInputs;

      const jwtToken = jwt.sign({ email }, APP_SECRET, {
        expiresIn: "30m",
      });
      let replacedStr = jwtToken.replace(/\./g, "_dev_");
      const checkMailIdIsValid = await this.repository.checkMail(email, {
        randomToken: replacedStr,
      });
      if (!checkMailIdIsValid) {
        return errorResData(false, message.dataNotFound, []);
      } else {
        const tranport = await tranportCreate();
        const mailOptions = {
          from: SMTP.user,
          to: checkMailIdIsValid.email,
          subject: "Password Reset Link",
          html: `
          <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
            color: #333333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        h1 {
            font-size: 30px;
           color: #37a0bf;
            margin-bottom: 20px;
        }
        p {
            font-size: 14px;
            margin-bottom: 10px;
        }
        a {
            color: #ffffff;
            text-decoration: none;
            background-color: #37a0bf;
            padding: 10px 20px;
            border-radius: 5px;
        }
    </style>
</head>
<bodyn >
    <div class="container">
        <h1>Reset Your Password</h1>
        <p>Dear ${checkMailIdIsValid.email}</p>
        <p>We have received a request to reset your account password. To ensure the security of your account, please follow the instructions below to complete the password reset process.
</p>
<p><b>Step 1: Access the Password Reset Page</b></p>
<p>Click on the following link to access the password reset page</p>
        <p><a 
        href="https://ivr-microservice.devtrust.biz/verify-forget-password/${checkMailIdIsValid.randomToken}">Reset Password</a></p>
        <p><b>Step 2: Verify Your Account</b></p>
<p>You will be prompted to enter your account information on the password reset page for verification purposes. Please provide the required details accuratel</p>
     <p><b>Step 3: Create a New Password</b></p>
<p>Once your account has been successfully verified, you will be directed to create a new password for it. Please ensure that you choose a strong password that is unique and not easily guessable.</p>
 <p><b>Password Requirements:</b></p>
<li>Minimum length of 6 characters.</li>
<li>Must contain at least one uppercase letter, one lowercase letter, one digit, and one unique character (!@#$%&*)</li>
        <p>If you are still unable to log in or have any further questions or concerns, please do not hesitate to reach out to our support team.</p>
        <p>If you did not request a password reset, you can ignore this email. Your current password will remain unchanged.</p>
        <p>Thank you for your cooperation.</p>
        <p>Best regards
</p>
    </div>
</body>
</html> `,
        };
        const sent = await tranport.sendMail(mailOptions);
        if (sent) {
          return {
            success: true,
            data: {
              emailResponse: sent.response,
              email: checkMailIdIsValid.email,
            },
          };
        } else {
          return errorResData(false, message.dataNotFound, []);
        }
      }
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async verifyToken(token: any) {
    try {
      const payload = await jwt.verify(token.token, APP_SECRET);
      if (!payload || payload == null) {
        return errorResData(false, message.dataNotFound, []);
      }
      const checkMailIdIsValid = await this.repository.checkMailWithToken(
        payload
      );

      if (!checkMailIdIsValid) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: checkMailIdIsValid };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async verifyUser(data: any) {
    try {
      const { password, token } = data;
      const payload = await jwt.verify(token, APP_SECRET);
      if (!payload || payload == null) {
        return errorResData(false, message.dataNotFound, []);
      }
      const checkMailIdIsValid = await this.repository.checkMailWithToken(
        payload
      );
      if (!checkMailIdIsValid) {
        return errorResData(false, message.dataNotFound, []);
      }
      let userPassword = await generatePassword(
        password,
        checkMailIdIsValid.salt
      );
      const changePasword = await this.repository.changePasswordAndVerify(
        userPassword,
        payload
      );

      return {
        success: true,
        data: changePasword,
      };
    } catch (error) {
      return errorResData(false, message.dataNotFound, []);
    }
  }
  async resetPassword(data: any) {
    try {
      const { id, password, newPassword } = data;

      const existingCustomer = await this.repository.findUserById(id);

      if (existingCustomer) {
        const validPassword = await validatePassword(
          password,
          existingCustomer.password,
          existingCustomer.salt
        );

        if (!validPassword) {
          return errorResData(false, message.dataNotFound, []);
        }
        let userPassword = await generatePassword(
          newPassword,
          existingCustomer.salt
        );

        const changePasword = await this.repository.changePassword(
          userPassword,
          existingCustomer.email
        );
        if (!changePasword) {
          return errorResData(false, message.dataNotFound, []);
        }

        return {
          success: true,
          data: changePasword,
        };
      } else {
        return errorResData(false, message.dataNotFound, []);
      }
    } catch (error: any) {
      return errorResData(false, error.message, []);
    }
  }
}
