var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

var fabricaDeConexao = require("../../config/connection-factory");
var conexao = fabricaDeConexao();

var UsuarioDAL = require("../models/UsuarioDAL");
var usuarioDAL = new UsuarioDAL(conexao);

var { verificarUsuAutenticado, limparSessao, gravarUsuAutenticado, verificarUsuAutorizado } = require("../models/autenticador_middleware");

const {body, validationResult } = require("express-validator");

router.get("/", verificarUsuAutenticado, function (req, res){
    let objJson = req.session.autenticado;
    objJson.retorno = null;
    objJson.erros = null;
    res.locals.erroLogin = null;
    res.render("pages/home", objJson)
});


// ,{ retorno: null, erros: null, }
router.get('/cadastro', (req, res) => {
    // Lógica para renderizar a página de cadastro
    res.locals.erroLogin = null;
    res.render('pages/cadastro', { listaErros: null, valors: { "nomeUsu":"", "senhaUsu":"", "emailUsu":""} }); // Passe erros ou null, dependendo do seu caso
});

router.get("/home", verificarUsuAutenticado, function(req, res){
    res.render("pages/home", req.session.autenticado,{retorno: null, erros: null})}
);

router.get("/sair", limparSessao, function(req,res){
    res.redirect("/");
})

router.get("/login", function(req, res){
    res.render("pages/login", {listaErros:null, retorno: null, erros: null,  valores: {"tsenha":"","temail":""}})}
);

router.get("/produto", function(req, res){
    res.render("pages/produto", {retorno: null, erros: null})}
);

router.get("/usuario", function(req, res){
    res.render("pages/usuario", {retorno: null, erros: null})}
);

router.get("/notifi", function(req, res){
    res.render("pages/notifi", {retorno: null, erros: null})}
);

router.get("/compras", function(req, res){
    res.render("pages/compras", {retorno: null, erros: null})}
);

router.get("/favoritos", function(req, res){
    res.render("pages/favoritos", {retorno: null, erros: null})}
);

router.get("/config", function(req, res){
    res.render("pages/config", {retorno: null, erros: null})}
);

router.get("/adm", function(req, res){
    res.render("pages/adm", {retorno: null, erros: null})}
);

router.get("/carrinho", function(req,res){
    res.render("pages/carrinho", {retorno: null, erros: null})
});

router.get("/historico", function(req, res){
    res.render("pages/historico", {retorno: null, erros: null})
});

router.get("/dados", function(req, res){
    res.render("pages/dados", {retorno: null, erros: null})
});

router.post("/produto", function(req, res){
    res.json(req.body)
});

router.get("/produto", function(req, res){
    res.render("pages/produto", {retorno: null, erros: null})
});

router.get("/anunciar", function(req, res){
    res.render("pages/anunciar", {retorno:null, erros:null})
});

router.get("/pagaconcluido", function(req, res){
    res.render("pages/pagaconcluido", {retorno: null, erros: null})
});

router.get("/pagacancelado", function(req, res){
    res.render("pages/pagacancelado", {retorno: null, erros: null})
});

router.get("/addprod", function(req, res){
    res.render("pages/addprod", {retorno: null, erros: null})
});

// Defina o sal para o bcrypt
const saltRounds = 10;

router.post(
  '/cadastrar',
  async function (req, res) {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.render('pages/cadastro', {
        retorno: null,
        listaErros: erros.array(),
        valors: req.body,
      });
    }

    try {
      const dadosForm = {
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, saltRounds)
      };

        // Supondo que "usuarioDAL.create" seja a função que insere os dados no banco de dados.
        // Certifique-se de tratá-la adequadamente no seu código.

        // const create = await usuarioDAL.create(dadosForm);

        // Após inserir os dados no banco de dados, você pode redirecionar o usuário para outra página.

        //   Cadastrar o usuário
        const create = await usuarioDAL.create(dadosForm);

      res.redirect('/');
    } catch (e) {
      res.render('pages/cadastro', {
        listaErros: null,
        retorno: null,
        valors: req.body,
      });
    }
  }
);

router.post(
    "/login",
    body("d-login"),
    body("t-email")
        .isEmail({min:5, max:50})
        .withMessage("O email deve ser válido"),
    body("t-senha")
        .isStrongPassword()
        .withMessage("A senha deve ser válida"),

    gravarUsuAutenticado(usuarioDAL, bcrypt),
    function(req, res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log(errors);    
            return res.render("pages/login", {retorno: null, listaErros: errors, valores: req.body});
        }
        if(req.session.autenticado != null) {
            res.redirect("/");
        } else {
            res.render("pages/login", { listaErros: null, retorno: null, valores: req.body})
        }
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pagina adm
router.get("/adm", verificarUsuAutorizado([/* */1,/* */ 2, 3], "pages/restrito"), verificarUsuAutenticado, async (req, res) => {
    try {
      const usuarios = await buscarUsuariosDoBanco();
      
      accex.query("SELECT COUNT(id_usuario) AS total_usuarios FROM usuario", (error, results) => {
        if (error) {
          console.error("Erro ao contar usuários:", error);
          res.status(500).send("Erro ao contar usuários.");
        } else {
          const totalUsuarios = results[0].total_usuarios;
          
          res.render("pages/adm", {
            listaErros: null,
            dadosNotificacao: null,
            valores: { nome: "", email: "", senha: "", img_perfil: ""},
            autenticado: req.session.autenticado,
            login: req.session.autenticado,
            id_tipo_usuario: req.session.autenticado.tipo,
            img_perfil_pasta: req.session.autenticado.img_perfil,
            usuarios: usuarios,
            totalUsuarios: totalUsuarios, 
          });
        }
      });
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).send("Erro ao buscar usuários.");
    }
  });
  
  async function buscarUsuariosDoBanco() {
    return new Promise((resolve, reject) => {
      accex.query("SELECT * FROM usuario", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  
  router.post("/desativar-usuario/:id", verificarUsuAutorizado([2, 3], "pages/restrito"), verificarUsuAutenticado, async (req, res) => {
    const id = req.params.id;
  
    try {
      await usuarioDAL.delete(id);
      res.status(200).send("Usuário desativado com sucesso.");
      console.log("Usuário desativado com sucesso.");
    } catch (error) {
      console.error("Erro ao desativar o usuário:", error);
      res.status(500).send("Erro ao desativar o usuário.");
      console.log("Erro ao desativar o usuário.");
    }
  });
  
  router.post("/reativar-usuario/:id", verificarUsuAutorizado([2, 3], "pages/restrito"), verificarUsuAutenticado, async (req, res) => {
    const id = req.params.id;
  
    try {
      await usuarioDAL.reactivate(id);
      res.status(200).send("Usuário reativado com sucesso.");
      console.log("Usuário reativado com sucesso.");
    } catch (error) {
      console.error("Erro ao reativar o usuário:", error);
      res.status(500).send("Erro ao reativar o usuário.");
      console.log("Erro ao reativar o usuário.");
    }
  });
  
  
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////




router.post("/home", function(req, res){
    res.json(req.body)
});

module.exports = router