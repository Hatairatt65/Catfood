module.exports = {
    port: 8081,
    db: {
        database: process.env.DB_NAME || 'catfoodDb',
        user: process.env.DB_User || 'root',
        password: process.env.DB_PASS || '',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            storage: './catfood-db.sqlite'
        },
    },
    authentication:{
        jwtSecret: "test"
    }
}