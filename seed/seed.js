let userId = "5b07108c2322cc2bd0a577d9"

const axios = require('axios')
.create({
  baseURL: 'http://localhost:8080',
  
});

axios.post("/api/v1/Business", {
    busName: `Most Amazing Biz`,
    address: {
        street: "123 Imaginary Lane",
        city: "Atlanta",
        state: "GA",
        zip: "30317"
    },
    description: "description goes here",
    user: userId
}).then(response => {
    console.log("Business -- Response", response)
        console.log("Successfully created business")
        axios.post("/api/v1/Blog", {
            business: response.data._id,
            title: "My 2nd Great Blog Post",
            body: "Duo Lorem ipsum it dolor",
            rating: "Good",
            author: userId,
        }).then(r => {
            console.log("Blog -- response", r)
        })
})
