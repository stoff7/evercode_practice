import swaggerJSDoc from "swagger-jsdoc";

export default swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'App Api', version: '1.0'
        },
    },
    apis: ['./routes/*.js'],
})