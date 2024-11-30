<template>
  <div class="p-6">
    <div class="mb-6 flex flex-wrap justify-between gap-4 flex-col-reverse sm:flex-row">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search items..." 
        class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
      <button 
        @click="showAddModal = true"
        class="flex gap-2 justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      ><PackagePlus />Add New Item
      </button>
    </div>

    <!-- show items -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th> -->
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="item in filteredItems" :key="item.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ item.title }}</td>
            <td class="px-6 py-4">{{ item.description }}</td>
            <td class="px-6 py-4 whitespace-nowrap">RM{{ item.price }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span v-if="item.stock === 0" class="px-2 py-1 rounded text-gray-700 border-[1px] border-gray-500 bg-gray-300/80">{{ item.stock }}</span>
              <span v-else-if="item.stock > 0 && item.stock <= 10" class="px-2 py-1 rounded text-yellow-700 border-[1px] border-yellow-500 bg-yellow-300/80">{{ item.stock }}</span>
              <span v-else="item.stock > 10" class="px-2 py-1 rounded text-green-700 border-[1px] border-green-500 bg-green-300/80">{{ item.stock }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(item.date_created) }}</td>
            <!-- <td class="px-6 py-4 whitespace-nowrap">
              <span v-if="formatDate(item.date_created) === formatDate(item.date_updated)" class="bg-gray-100 px-2 py-1 rounded text-gray-600">No Update</span>
              <span v-else>{{ formatDate(item.date_updated) }}</span>
            </td> -->
            <td class="px-6 py-4 whitespace-nowrap my-auto">
              <button @click="editItem(item)" class="text-gray-600 hover:text-gray-900 mr-2">
                <Pencil />
              </button>
              <button @click="deleteItem(item.id)" class="text-red-700 hover:text-red-900">
                <Trash2 />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- add/update items -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">{{ showEditModal ? 'Edit Item' : 'Add New Item' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input 
              v-model="formData.title" 
              type="text" 
              placeholder="Item name..."
              required
              class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              v-model="formData.description" 
              placeholder="About item..."
              required
              class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Price (RM)</label>
            <input 
              v-model="formData.price" 
              type="number" 
              step="0.01" 
              placeholder="Digit only..."
              required
              class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Stock</label>
            <input 
              v-model="formData.stock" 
              type="number" 
              step="1" 
              placeholder="Stock left..."
              required
              class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          <div class="flex justify-end gap-2">
            <button 
              type="button" 
              @click="closeModal"
              class="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {{ showEditModal ? 'Update' : 'Add' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import api from '../services/api';
import { PackagePlus } from 'lucide-vue-next';
import { Pencil } from 'lucide-vue-next';
import { Trash2 } from 'lucide-vue-next';

const items = ref([]);
const searchQuery = ref('');
const showAddModal = ref(false);
const showEditModal = ref(false);
const formData = ref({
  title: '',
  description: '',
  price: '',
  stock: ''
});
const editingItemId = ref(null);

const filteredItems = computed(() => {
  return items.value.filter(item =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const loadItems = async () => {
  try {
    const response = await api.getItems();
    items.value = response.data;
  } catch (error) {
    console.error('Error loading items:', error);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  formData.value = { title: '', description: '', price: '', stock: '' };
  editingItemId.value = null;
};

const handleSubmit = async () => {
  try {
    if (showEditModal.value) {
      await api.updateItem(editingItemId.value, formData.value);
    } else {
      await api.createItem(formData.value);
    }
    await loadItems();
    closeModal();
  } catch (error) {
    console.error('Error saving item:', error);
  }
};

const editItem = (item) => {
  formData.value = { ...item };
  editingItemId.value = item.id;
  showEditModal.value = true;
};

const deleteItem = async (id) => {
  if (confirm('Are you sure you want to delete this item?')) {
    try {
      await api.deleteItem(id);
      await loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
};

loadItems();
</script>