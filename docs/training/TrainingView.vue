<script setup lang="ts">
import { ref } from 'vue'
import { createApi, type Product } from '/.vitepress/api'

const api = createApi()
const product = ref<Product | null>(null)
const loading = ref(false)
const err = ref<string | null>(null)
const productId = ref<number>(59)

async function loadProduct() {
  loading.value = true
  err.value = null
  product.value = null
  try {
    product.value = await api.getProduct(productId.value)
  } catch (e: unknown) {
    err.value = e instanceof Error ? e.message : 'error'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div style="display:flex; gap:8px; align-items:center; margin-bottom:12px;">
    <input v-model.number="productId" type="number" min="1" placeholder="ID" style="width:120px;" />
    <button @click="loadProduct" :disabled="loading">Загрузить</button>
  </div>

  <div v-if="loading">Загрузка…</div>
  <div v-else-if="err">Ошибка: <code>{{ err }}</code></div>
  <div v-else-if="product">
    <h2>{{ product.title }} (ID: {{ product.id }})</h2>
    <p>Цена: {{ product.price }}$</p>
    <p v-if="product.brand">Бренд: {{ product.brand }}</p>
    <p v-if="product.category">Категория: {{ product.category }}</p>
    <p style="white-space:pre-line">{{ product.description }}</p>

    <h3>JSON</h3>
    <pre><code>{{ JSON.stringify(product, null, 2) }}</code></pre>
  </div>
</template>

