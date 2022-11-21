import chalk from "chalk";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const AuthController = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  };

  static async loginPost(req, res) {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      req.flash("message", "Usuário não encontrado.");
      res.render("auth/login");
    };

    //chek if password matches
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if(!passwordMatch) {
      req.flash("message", "Senha inválida, por favor tente novamente.");
      res.render("auth/login");
    };

    //initalize session
    req.session.userid = user.id;
    req.flash("message", "Autenticação realizada com sucesso.");
    req.session.save(() => {
      res.redirect("/");
    });
  };

  static register(req, res) {
    res.render("auth/register");
  };

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;
    // password match validation
    if (password != confirmpassword) {
      req.flash("message", "As senhas estão diferentes, tente novamente.");
      res.render("auth/register");
      return;
    };

    //chek if user already exists
    const checkIfUserExists = await User.findOne({ where: { email: email } });
    if (checkIfUserExists) {
      req.flash("message", "Esse e-mail já foi cadastrado, por favor tente outro.");
      res.render("auth/register");
      return;
    };

    // create password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);
      //initalize session
      req.session.userid = createdUser.id;
      //initalize session
      req.flash("message", "Cadastro realizado com sucesso.");
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(chalk.red(`Erro ao criar usuário: ${error}`));
    };
  };

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  };
};

export default AuthController;