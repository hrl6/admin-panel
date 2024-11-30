<template>
  <div class="min-h-screen bg-gray-100/50">
    <header class="bg-white shadow">
      <div class="flex gap-2 max-w-7xl mx-auto py-6 px-6">
        <img src="../public/admin-panel-logo.svg" alt="Logo Admin">
        <h1 class="text-3xl font-bold text-gray-900">Admin Panel</h1>
      </div>
    </header>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <ItemTable />
    </main>
  </div>
</template>

<script>
import ItemTable from './components/ItemTable.vue'

export default {
  name: 'App',
  components: {
    ItemTable
  }
}
</script>