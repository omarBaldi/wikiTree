module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: process.env.NODE_ENV === 'development' 
                        ? 'http://localhost:3000' 
                        : 'https://wikipediatree.herokuapp.com'
                }
            }
        }
    }
};