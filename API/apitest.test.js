var supertest = require('supertest')
const request = supertest('https://localhost:3000/')

describe('Category Testing', () => {
   beforeAll(() => {
      console.log('Start Test Cases')
   });
   afterAll(() => {
      console.log('Finished Test Cases')
   });


   //Api Test 1 to get the title from product page
   test.each(['Product 1'])('Get the title from Product 1 page ', async (title) => {
      const response = await request.get(`api/p/1?title=${title}`)
      console.log(response.body)
      expect(response.status).toBe(200)
   });

   //Api Test 1 to categorize product types
   test.each(['new', 'used'])('Categorize products on the basis of their product type', async (type) => {
      const response = await request.get(`api/s/1?type=${type}`)
      console.log(response.body)
      expect(response.status).toBe(200)
   });

   //Api Test 3 to categorize product by their sizes
   test.each(['SM', 'MD', 'LG', 'XL', 'XXL'])('Categorize products on the basis of their size', async (name) => {
      const response = await request.get(`api/s/1?name=${name}`)
      console.log(response.body)
      expect(response.status).toBe(200)
   });

})
