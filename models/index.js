// models/index.js

import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Create Sequelize instance
const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql'
});

// Define ProductLines model
const ProductLines = sequelize.define('productlines', {
  productLine: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  textDescription: {
    type: DataTypes.STRING(4000),
    allowNull: true
  },
  htmlDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.BLOB('medium'),
    allowNull: true
  }
},{
  timestamps: false
});

// Define Products model
const Products = sequelize.define('products', {
  productCode: {
    type: DataTypes.STRING(15),
    primaryKey: true
  },
  productName: {
    type: DataTypes.STRING(70),
    allowNull: false
  },
  productLine: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  productScale: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  productVendor: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  productDescription: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  quantityInStock: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  buyPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  MSRP: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
},{
  timestamps: false
});

// Define Offices model
const Offices = sequelize.define('offices', {
  officeCode: {
    type: DataTypes.STRING(10),
    primaryKey: true
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  addressLine1: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  addressLine2: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  postalCode: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  territory: {
    type: DataTypes.STRING(10),
    allowNull: false
  }
},{
  timestamps: false
});

// Define Employees model
const Employees = sequelize.define('employees', {
  employeeNumber: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  extension: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  officeCode: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  reportsTo: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  jobTitle: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
},{
  timestamps: false
});

// Define Customers model
const Customers = sequelize.define('customers', {
  customerNumber: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true

  },
  customerName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  contactLastName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  contactFirstName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  addressLine1: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  addressLine2: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  postalCode: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  salesRepEmployeeNumber: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  creditLimit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
},{
  timestamps: false
});

// Define Payments model
const Payments = sequelize.define('payments', {
  customerNumber: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  checkNumber: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
},{
  timestamps: false
});

// Define Orders model
const Orders = sequelize.define('orders', {
  orderNumber: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  requiredDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  shippedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  customerNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  timestamps: false
});

// Define OrderDetails model
const OrderDetails = sequelize.define('orderdetails', {
  orderNumber: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  productCode: {
    type: DataTypes.STRING(15),
    primaryKey: true
  },
  quantityOrdered: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  priceEach: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  orderLineNumber: {
    type: DataTypes.SMALLINT,
    allowNull: false
  }
},{
  timestamps: false
});

// Define associations
ProductLines.hasMany(Products, { foreignKey: 'productLine' });
Products.belongsTo(ProductLines, { foreignKey: 'productLine' });

Employees.hasMany(Customers, { foreignKey: 'salesRepEmployeeNumber' });
Customers.belongsTo(Employees, { foreignKey: 'salesRepEmployeeNumber' });

Employees.hasMany(Employees, { foreignKey: 'reportsTo' });
Employees.belongsTo(Employees, { foreignKey: 'reportsTo' });

Employees.belongsTo(Offices, { foreignKey: 'officeCode' });
Offices.hasMany(Employees, { foreignKey: 'officeCode' });

Customers.hasMany(Payments, { foreignKey: 'customerNumber' });
Payments.belongsTo(Customers, { foreignKey: 'customerNumber' });

Customers.hasMany(Orders, { foreignKey: 'customerNumber' });
Orders.belongsTo(Customers, { foreignKey: 'customerNumber' });

Orders.hasMany(OrderDetails, { foreignKey: 'orderNumber' });
OrderDetails.belongsTo(Orders, { foreignKey: 'orderNumber' });

Products.hasMany(OrderDetails, { foreignKey: 'productCode' });
OrderDetails.belongsTo(Products, { foreignKey: 'productCode' });

// Export models
export {
  ProductLines,
  Products,
  Employees,
  Customers,
  Offices,
  Orders,
  OrderDetails,
};
