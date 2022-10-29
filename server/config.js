module.exports = {
    jwtSecret: 'z-23-websitetoken',
    jwtSignOptions: { expiresIn: '1h' },
    // mongoUri: 'mongodb+srv://dishu001:98765432d@cluster0.3ej6fto.mongodb.net/?retryWrites=true&w=majority',
    mongoUri: 'mongodb://localhost:27017',
    port: process.env.PORT || 3001,
    saltRound: 10,
};