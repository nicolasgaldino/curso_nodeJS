import chalk from "chalk";
import { Op } from "sequelize";
import User from "../models/User.js";
import Tought from "../models/Tought.js";

const ToughtController = class ToughtController {
  static async showToughts(req, res) {
    let search = "";
    if (req.query.search) { search = req.query.search; };
    let order = "";
    req.query.order === "old" ? order = "ASC" : order = "DESC";
    const toughtsData = await Tought.findAll({
      include: User,
      where: {
        title: { [Op.like]: `%${search}%` },
      },
      order: [["createdAt", order]],
    });
    const toughts = toughtsData.map((toughtsResult) => toughtsResult.get({ plain: true }));
    let toughtsQty = toughts.length;
    if (toughtsQty === 0) { toughtsQty = false; };
    res.render("toughts/home", { toughts: toughts, search: search, toughtsQty: toughtsQty });
  };

  static async showDashboard(req, res) {
    const userId = req.session.userid;
    const user = await User.findOne({
      where: {
        id: userId
      },
      include: Tought,
      plain: true,
    });
    if (!user) { res.redirect("/login"); };
    const toughts = user.Toughts.map((toughtsResult) => toughtsResult.dataValues);
    let emptyToughts = false;
    if (toughts.length === 0) { emptyToughts = true; };
    res.render("toughts/dashboard", { toughts: toughts, emptyToughts: emptyToughts });
  };

  static createTought(req, res) {
    res.render("toughts/create");
  };

  static async createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };
    try {
      await Tought.create(tought);
      req.flash("message", "Pensamento criado com sucesso!");
      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(chalk.bgRed(`Erro ao criar pensamento: ${error}`));
    };
  };

  static async removeTought(req, res) {
    const id = req.body.id;
    const UserId = req.session.userid;
    try {
      await Tought.destroy({ where: { id: id, UserId: UserId } });
      req.flash("message", "Pensamento removido com sucesso!");
      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(chalk.bgRed(`Erro ao remover o pensamento: ${error}`));
    };
  };

  static async editTought(req, res) {
    const id = req.params.id;
    const tought = await Tought.findOne({ where: { id: id }, raw: true });
    res.render("toughts/edit", { tought: tought });
  };

  static async updateTought(req, res) {
    const id = req.body.id;
    const tought = { title: req.body.title };
    try {
      await Tought.update(tought, { where: { id: id } });
      req.flash("message", "Pensamento atualizado com sucesso!");
      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(chalk.bgRed(`Erro ao editar pensamento: ${error}`));
    }
  };
};

export default ToughtController;
