import { use, expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../index.js'; // Note the ".js" extension
import { Customers } from '../models/index.js';

const chai = use(chaiHttp)

describe('Products Route', function () {
  this.timeout(10000); // Set a longer timeout for all tests in this suite (10 seconds)

  it('should return 404 if customer does not exist', async () => {
    const res = await chai.request(app).get('/customers/9990/products');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error', 'Customer not found');
  });

  it('should return 404 if no orders are found for the customer', async () => {
    await Customers.upsert({ 
      customerName: 'Test Customer', 
      contactFirstName: 'Test', 
      contactLastName: 'Customer',
      customerNumber: '12',
      phone:'089', 
      addressLine1: 'line 1',
      city: 'Jakarta',
      country: 'Indonesia'
     });

    const res = await chai.request(app).get(`/customers/12/products`);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('message', 'No orders found for the specified customer');
  });

  it('should return products for a given customer', async () => {
    const res = await chai.request(app).get(`/customers/103/products`);
    console.log(res.body)
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('totalOrderAmount', 22314.36);
    expect(res.body).to.have.property('totalOrderQty', 270);
    expect(res.body).to.have.property('totalOrderProduct', 7);
  });
});