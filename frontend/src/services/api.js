import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
});

export default {
  getItems() {
    return api.get('/items/');
  },
  getItem(id) {
    return api.get(`/items/${id}/`);
  },
  createItem(data) {
    return api.post('/items/', data);
  },
  updateItem(id, data) {
    return api.put(`/items/${id}/`, data);
  },
  deleteItem(id) {
    return api.delete(`/items/${id}/`);
  }
};