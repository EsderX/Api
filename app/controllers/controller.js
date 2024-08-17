

const db = require('../config/db.config.js');
const Music = db.Music;

exports.create = (req, res) => {
    let music = {};

    try{
        // Building Customer object from upoading request's body
        music.nombre_cancion = req.body.nombre_cancion;
        music.Descripcion = req.body.Descripcion;
        music.Artista = req.body.Artistatista; 
        music.Duracion = req.body.Duracion;
        music.Extension_cancion = req.body.Extension_cancion;
        music.Album = req.body.Album;
        music.anio = req.body.anio;
    
        // Save to MySQL database
        music.create(music).then(result => {    
            res.status(200).json({
                message: "Upload Successfully a Music with id = " + result.id,
                music: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllCustomers = (req, res) => {
    // find all Customer information from 
    Music.findAll()
        .then(musicInfos => {
            res.status(200).json({
                message: "Get all Customers' Infos Successfully!",
                musics: musicInfos
            });
        })
        . catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

exports.getCustomerById = (req, res) => {
  // find all Customer information from 
  let musicid = req.params.id;
  Music.findByPk(musicid)
      .then(music => {
          res.status(200).json({
              message: " Successfully Get a Customer with id = " + musicid,
              musics: customer
          });
      })
      . catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}


exports.filteringByAge = (req, res) => {
  let age = req.query.age;

    Music.findAll({
                      attributes: ['id', 'nombre_cancion', 'Descripcion', 'Artista', 'Duracion', 'Extension_cancion',"Album","anio"],
                      where: {age: age}
                    })
          .then(results => {
            res.status(200).json({
                message: "Get all Customers with age = " + age,
                musics: results,
            });
          })
          . catch(error => {
              console.log(error);
              res.status(500).json({
                message: "Error!",
                error: error
              });
            });
}


exports.updateById = async (req, res) => {
    try{
        let musicid = req.params.id;
        let music = await Music.findByPk(musicid);
    
        if(!music){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a customer with id = " + musicid,
                music: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                nombre_cancion: req.body.nombre_cancion,
                Descripcion: req.body.Descripcion,
                Artista: req.body.Artista,
                Duracion: req.body.Duracion,
                Extension_cancion: req.body.Extension_cancion,
                Album: req.body.Album,
            }
            let result = await Customer.update(updatedObject, {returning: true, where: {id: customerId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a customer with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Customer with id = " + musicid,
                music: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a customer with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let customerId = req.params.id;
        let customer = await Customer.findByPk(customerId);

        if(!customer){
            res.status(404).json({
                message: "Does Not exist a Customer with id = " + customerId,
                error: "404",
            });
        } else {
            await customer.destroy();
            res.status(200).json({
                message: "Delete Successfully a Customer with id = " + customerId,
                customer: customer,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id,
            error: error.message,
        });
    }
}