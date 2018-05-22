import axios from "axios";

export default {
 
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  }
  
 
};