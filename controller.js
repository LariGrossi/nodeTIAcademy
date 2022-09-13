const express = require('express');
const cors = require('cors');
const {Sequelize}= require('./models');
const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let cartao = models.Cartao;
let compra = models.Compra;
let empresa = models.Empresa;
let promocao = models.Promocao;

let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
  console.log("Servidor esta ativo: " + "http://localhost:3001");
});


app.post('/cliente', async(req, res) =>{
  await cliente.create(
    req.body
    ).then(cli =>{
      return res.json({
        error: false,
        message: "Cliente foi inserido com sucesso.",
        cli
      });
    }).catch(erro=>{
      return res.status(400).json({
        error: true,
        message: "Problema de conexão com a API.",
      });
    });
});

app.post('/cliente/:id/cartao', async(req, res)=>{
    const cart = {        
        dataCartao: req.body.dataCartao,
        validade: req.body.validade,
        ClienteId: req.params.id
    };
    if ( ! await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Cliente não existe."
        });
    };

    await cartao.create(cart)
    .then(cartcli =>{
        return res.json({
          error: false,
          message: "Cartao foi inserido com sucesso.",
          cartcli
        });
}).catch(erro=>{
    return res.status(400).json({
      error: true,
      message: "Problema de conexão com a API.",
    });
  });
  });

  app.post('/cartao/:idcartao/compra/:idpromocao', async(req, res)=>{
    const comp = {
      CartaoId: req.params.idcartao,
      PromocaoId: req.params.idpromocao,
      data: req.body.data,
      quantidade: req.body.quantidade,
      valor: req.body.valor
    };
    if ( ! await cartao.findByPk(req.params.idcartao)){
        return res.status(400).json({
            error: true,
            message: "Cartão não existe."
        });
    };

    if ( ! await promocao.findByPk(req.params.idpromocao)){
      return res.status(400).json({
          error: true,
          message: " Promoção não existe."
      });
  };

    await compra.create(comp)
    .then(compcli =>{
        return res.json({
          error: false,
          message: "Compra foi inserida com sucesso.",
          compcli
        });
}).catch(erro=>{
    return res.status(400).json({
      error: true,
      message: "Problema de conexão com a API.",
    });
  });
  });


  app.post('/empresa', async(req, res) =>{
    await empresa.create(
      req.body
      ).then(emp =>{
        return res.json({
          error: false,
          message: "Empresa cadastrada com sucesso.",
          emp
        });
      }).catch(erro=>{
        return res.status(400).json({
          error: true,
          message: "Problema de conexão com a API.",
        });
      });
  });
  


  app.post('/empresa/:id/promocao', async(req, res)=>{
    const pro = {
      EmpresaId :req.params.id,
      nome: req.body.nome,
      descricao: req.body.descricao,
      validade: req.body.validade
    };
    if ( ! await empresa.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Empresa não existe."
        });
    };

    await promocao.create(pro)
    .then(proemp =>{
        return res.json({
          error: false,
          message: "Promoção foi inserida com sucesso.",
          proemp
        });
}).catch(erro=>{
    return res.status(400).json({
      error: true,
      message: "Problema de conexão com a API.",
    });
  });
  });