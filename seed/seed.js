let userId = "5b06f638ba627a29e691767a"

const axios = require('axios')
.create({
  baseURL: 'http://localhost:8080',
  
});

axios.post("/api/v1/Business", {
    busName: `my business #{userId}`,
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
    if(response.state === 200) {
        console.log("Successfully created business")
        axios.post("/api/v1/Blog", {
            business: response.data._id,
            title: "My Great Blog Post",
            body: "Lorem ipsum it dolor",
            rating: "Good",
            author: userId,
        }).then(r => {
            console.log("Blog -- response", r)
        })
    }
})