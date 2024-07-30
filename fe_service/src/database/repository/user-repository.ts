import { Login } from "../entity/login";

export class UserRepository {
  async createUser(data: any) {
   return Login.save(data);
  }

  async findUser(email: any) {
    try {
    return Login.findOne({
      where: { email, isDelated: false },
    });

    } catch (err) {
      throw new Error("Can not find user");
    }
  }
  async findUserById(id: any) {
    try {
      return Login.findOne({
        where: { id: id, isDelated: false },
      });
    } catch (err) {
      throw new Error("Can not find user");
    }
  }

  async checkMail(email: any, randomToken: any) {
    const existingCustomer = await Login.findOne({
      where: { email: email, isDelated: false },
    });
    console.log(existingCustomer, "existing ");
    if (!existingCustomer) {
      return false;
    }
    Login.merge(existingCustomer, randomToken);
    const result = await Login.save(existingCustomer);
    if (!result) {
      return false;
    }
    return result;
  }
  async checkMailWithToken(payload: any) {
    const email = payload.email;

  return Login.findOne({
    where: { email: email, isDelated: false },
  });

  }
  async checkUser(email: any, password: any) {
    return Login.findOne({
      where: { email: email, password: password, isDelated: false },
    });
  }
  async changePasswordAndVerify(password: any, payload: any) {
    const email = payload.email;
    const existingCustomer = await Login.findOne({
      where: { email: email, isDelated: false },
    });

    if (!existingCustomer) {
      return false;
    }

    Login.merge(existingCustomer, { password });
    const result = await Login.save(existingCustomer);

    if (!result) {
      return false;
    }
    return result;
  }
  async changePassword(password: any, email: any) {
    console.log(password, email);
    const existingCustomer = await Login.findOne({
      where: { email: email, isDelated: false },
    });

    if (!existingCustomer) {
      return false;
    }

    Login.merge(existingCustomer, { password });
    const result = await Login.save(existingCustomer);

    if (!result) {
      return false;
    }
    return result;
  }
}
