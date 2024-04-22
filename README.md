Classic Models API
==================

This repository contains an Express.js API that provides endpoints to fetch product details and total order amounts for a given customer. The API is built using Node.js, Express.js, and Sequelize, and it interacts with a MySQL database containing the Classic Models sample database.

Getting Started
---------------

### Prerequisites

-   Node.js and npm installed on your machine
-   MySQL server installed and running
-   MySQL Workbench or any other MySQL client for executing SQL scripts (optional)

### Installation

1.  Clone this repository to your local machine:

2.  Navigate to the project directory:

3.  Install dependencies:

4.  Set up the MySQL database:

    -   Download the Classic Models sample database SQL script from [MySQLTutorial.org](https://www.mysqltutorial.org/getting-started-with-mysql/mysql-sample-database/).
    -   Execute the SQL script in your MySQL server using MySQL Workbench or any other MySQL client to create the database schema and populate it with sample data.
5.  Configure the database connection:

    -   Create the `.env` file.
    -   Add and fill this to your `.env` file
      ```
      DB_HOST=""
      DB_PORT=""
      DB_NAME=""
      DB_USERNAME=""
      DB_PASSWORD=""
        
6.  Start the server:

    bashCopy code

    `npm start`

7.  The server should now be running on `http://localhost:3000`.

API Endpoints
-------------

-   GET /customers/:customerId/products

    Fetches products ordered by a specific customer along with the total order amount.

    -   Parameters:
        -   `customerId`: The customer number for which to fetch products and total order amount.

    Example Request:

    bashCopy code

    `GET [http://localhost:3000/customers/103/products](http://localhost:3000/customers/103/products)`

    Example Response:


    ```
    {
    "totalOrderAmount": 22314.36,
    "totalOrderQty": 270,
    "totalOrderProduct": 7,
    "orders": [
        {
            "orderNumber": 10123,
            "orderDate": "2003-05-20",
            "requiredDate": "2003-05-29",
            "shippedDate": "2003-05-22",
            "status": "Shipped",
            "comments": null,
            "customerNumber": 103,
            "orderdetails": [
                {
                    "orderNumber": 10123,
                    "productCode": "S18_1589",
                    "quantityOrdered": 26,
                    "priceEach": "120.71",
                    "orderLineNumber": 2,
                    "product": {
                        "productCode": "S18_1589",
                        "productName": "1965 Aston Martin DB5",
                        "productLine": "Classic Cars",
                        "productScale": "1:18",
                        "productVendor": "Classic Metal Creations",
                        "productDescription": "Die-cast model of the silver 1965 Aston Martin DB5 in silver. This model includes full wire wheels and doors that open with fully detailed passenger compartment. In 1:18 scale, this model measures approximately 10 inches/20 cm long.",
                        "quantityInStock": 9042,
                        "buyPrice": "65.96",
                        "MSRP": "124.44"
                    }
                },
             ...
            ]
        },
    ...
    ]}
    

Contributing
------------

Contributions are welcome! Feel free to open issues or pull requests for any improvements or bug fixes.

License
-------

This project is licensed under the MIT License - see the LICENSE file for details.
