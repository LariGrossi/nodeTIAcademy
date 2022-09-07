'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Compras', {
      CartaoId : {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        References: {
          model: 'cartaos',
          key: 'id'
        },
        OnDelete: 'CASCADE',
        OnUpdate: 'CASCADE'
      },
      PromocaoId : {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        References: {
          model: 'promocaos',
          key: 'id'
        },
        OnDelete: 'CASCADE',
        OnUpdate: 'CASCADE'
      },
      data: {
        type: Sequelize.DATEONLY
      },
      quantidade: {
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
     

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Compras');
  }
};