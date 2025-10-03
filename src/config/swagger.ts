import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KapeePro API',
      version: '1.0.0',
      description: 'A comprehensive e-commerce API built with Node.js, Express, TypeScript, and MongoDB',
      contact: {
        name: 'KapeePro Support',
        email: 'support@kapeepro.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://your-production-url.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
            },
            username: {
              type: 'string',
              description: 'Username',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            userRole: {
              type: 'string',
              enum: ['user', 'admin'],
              default: 'user',
              description: 'User role',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Product: {
          type: 'object',
          required: ['prodName', 'prodPrice', 'prodQty', 'image'],
          properties: {
            _id: {
              type: 'string',
              description: 'Product ID',
            },
            prodName: {
              type: 'string',
              description: 'Product name',
            },
            prodDesc: {
              type: 'string',
              description: 'Product description',
            },
            prodPrice: {
              type: 'number',
              minimum: 0,
              description: 'Product price',
            },
            prodQty: {
              type: 'number',
              minimum: 0,
              description: 'Product quantity',
            },
            image: {
              type: 'string',
              description: 'Product image URL',
            },
            createdBy: {
              type: 'string',
              description: 'User ID who created the product',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        CartItem: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              description: 'Product ID',
            },
            quantity: {
              type: 'number',
              minimum: 1,
              description: 'Quantity of the product',
            },
          },
        },
        Cart: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Cart ID',
            },
            userId: {
              type: 'string',
              description: 'User ID',
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/CartItem',
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Order: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Order ID',
            },
            userId: {
              type: 'string',
              description: 'User ID',
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/CartItem',
              },
            },
            totalAmount: {
              type: 'number',
              minimum: 0,
              description: 'Total order amount',
            },
            status: {
              type: 'string',
              enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
              default: 'pending',
              description: 'Order status',
            },
            paymentStatus: {
              type: 'string',
              enum: ['pending', 'paid', 'failed'],
              default: 'pending',
              description: 'Payment status',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Category ID',
            },
            name: {
              type: 'string',
              description: 'Category name',
            },
            description: {
              type: 'string',
              description: 'Category description',
            },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Response message',
            },
            success: {
              type: 'boolean',
              description: 'Success status',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
            error: {
              type: 'string',
              description: 'Error details',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'], // Paths to files containing OpenAPI definitions
};

const specs = swaggerJSDoc(options);

export { specs, swaggerUi };