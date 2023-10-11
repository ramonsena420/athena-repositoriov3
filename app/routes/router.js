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
    objJson.retorno = null
    objJson.erros = null
    res.render("pages/home", objJson)
});
// ,{ retorno: null, erros: null, }
router.get("/cadastro", function(req, res){
    res.render("pages/cadastro", {listaErros:null, valores: {"t-nome":"","t-email":"", "t-senha":"","t-confsenha":""}})}
);

router.get("/home", verificarUsuAutenticado, function(req, res){
    res.render("pages/home", req.session.autenticado,{retorno: null, erros: null})}
);

router.get("/sair", limparSessao, function(req,res){
    res.redirect("/");
})

router.get("/login", function(req, res){
    res.render("pages/login", {listaErros:null, retorno: null, erros: null,  valores: {"t-senha":"","t-email":""}})}
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
    res.render("pages/addprod", {reotrno: null, erros: null})
});

router.post( 
    "/cadastro",
    body("d-cadastro"),
    body("tnome")
        .isInt({min: 2, max: 40})
        .withMessage("O nome deve ter no minimo 2 caracteres"),
    body("temail")
        .isEmail({min: 5, max: 50})
        .withMessage("O email deve ser válido"), 
    body("tsenha")
        .isStrongPassword()
        .withMessage("A senha deve ser válida"),
    body("tconfsenha")
        .isStrongPassword()
        .withMessage("A senha deve ser a mesma que a anterior"),

    async function (req, res){
        var dadosForm = {
            user_usu: req.body.tnome,
            email_usu: req.body.temail,
            senha_usu: bcrypt.hashSync (req.body.tsenha, salt),
            confirmar_usu: req.body.tconfSenha,
        };
        const erros = validationResult(req);
        if(!erros.isEmpty()) {
            return res.render("pages/cadastro", {retorno: null, listaErros: erros, valores: req.body})
        }
        try {
            let create = await usuarioDAL.create(dadosForm);
            res.redirect("/")
        } catch (e) {
            res.render("pages/cadastro", {listaErros: null,retorno: null, valores: req.body})
        }
    });
router.get("/adm", verificarUsuAutorizado([2, 3], "pages/restrito"), function(req,res){
    res.render("pages/adm", req.session.autenticado);
});

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

router.post("/home", function(req, res){
    res.json(req.body)
});

module.exports = router