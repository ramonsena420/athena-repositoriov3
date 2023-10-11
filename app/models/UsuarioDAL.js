module.exports = class UsuarioDAL {

    constructor(conexao){
        this.conexao = conexao;
    }
    
    findAll(){
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT u.id_usu, u.nome_usu, u.user_usu, " + "u.status.usu, u.email_usu, u.tel_usu, u.tipo_usu "+ "u.tipo_usu = t.id_tipo_usu", function (error, elements){
                if (error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    findUserEmail(camposForm) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM usuario WHERE user_usu = ? or email_usu = ?", [camposForm.user_usu, camposForm.user_email], function (error, elements) {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    findID(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT u.id_usu, u.nome_usu, u.user_usu," + "u.senha_usu, u.email_usu, u.tel_usu, u.tipo_usu" + "u.status_usu, t.tipo_usu, t.descricao_usu FROM usuario u, tipo_usu t where u.status_usuario = ' and " + "u.tipo_usu = t.tipo_usu and u.id_usu = ?", [id], function(error, elements){
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    create(camposJson) {
        return new Promise((resolve, reject) => {
            this.conexao.query("insert into usuario set ?", camposJson, function(error, elements){
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    update(camposJson) {
        return new Promise((resolve, reject) => {
            this.conexao.query("UPDATE usuario SET nome_usu = ?, user_usu = ?, senha_usu = ?, " + "email_usu = ?, tel_usu = ?, tipo_usu = ?, status_usu = ? " + "WHERE id_usu = ?", [camposJson.nome_usu, camposJson.user_usu, camposJson.senha_usu, camposJson.email_usu, camposJson.tel_usu, camposJson.tipo_usu, camposJson.status_usu, camposJson.id_usu], function (error, results, fields){
                if (error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("UPDATE usuario SET status_usu = 0 WHERE id_usu = ?", [id], function(error, results) {
                if (error) {
                    return reject(error);
                }
                return resolve(results[0]);
            });
        });
    }

}