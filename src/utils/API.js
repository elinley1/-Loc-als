import axios from "axios";

export default {
 
  // Gets the book with the given id
  getBusiness: function(id) {
    return axios.get("/api/business/" + id);
  }
  
 
};