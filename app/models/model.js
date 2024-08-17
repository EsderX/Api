
module.exports = (sequelize, Sequelize) => {
	const Music = sequelize.define('music', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  nombre_cancion: {
			type: Sequelize.STRING
	  },
	  Descripcion: {
			type: Sequelize.STRING
  	},
	  Artista: {
			type: Sequelize.STRING
	  },
	  Duracion: {
			type: Sequelize.INTEGER
    },
    Extension_cancion: {
      type: Sequelize.STRING
    },
	Album:{
		type:sequelize.STRING
	},
	anio:{
		Type:sequelize.INTEGER
	}
	});
	
	return Music;
}