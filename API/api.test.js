var supertest = require('supertest')
const request = supertest('http://localhost:3000/')  

describe('React Store Front Test Suite', () =>{

    beforeAll(() => {
        console.log('Start Running api Test Cases')
    });
    afterAll(() => {
        console.log('Fininished Running api Test Cases')
    });

    //Test case 1
    test.each(['20.99'])('Get the price from Product 1 page ', async (price)=> {
        const response = await request.get(`api/p/2?price=${price}`) 
        console.log(response.body) 
        expect(response.status).toBe(200)
    });

    //Test case 2
    test.each(['Price - Lowest','Price - Highest','Most Popular','Highest Rated'])('Get the type of sortings from Subcategory 1 page ', async (name)=> {
        const response = await request.get(`api/s/1?name=${name}`) 
        console.log(response.body) 
        expect(response.status).toBe(200)
    });

    //Test case 3
    test.each(['Red','Green','Blue','Grey','Teal','Orange','Purple', 'Black'])('Get the type of colors from Subcategory 1 page ', async (code)=> {
        const response = await request.get(`api/s/1?code=color:${code}`) 
        console.log(response.body) 
        expect(response.status).toBe(200)
    });

});