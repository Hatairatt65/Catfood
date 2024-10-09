module.exports = (sequelize, DataTypes) => {
    const Catfood = sequelize.define('Catfood', {
        catfoodname: DataTypes.STRING,
        brand: DataTypes.STRING,
        age: DataTypes.STRING,
        type: DataTypes.STRING,
        price: DataTypes.STRING,     
        Stock: DataTypes.STRING,
        picture: DataTypes.STRING
    })
    return Catfood
}