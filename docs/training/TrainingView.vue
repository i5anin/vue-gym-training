<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { createApi, type Product } from '/.vitepress/api'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/github-dark.css'

hljs.registerLanguage('json', json)

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

// подсветка при изменении данных
watch(product, async () => {
  await nextTick()
  document.querySelectorAll('pre code').forEach(el => {
    hljs.highlightElement(el as HTMLElement)
  })
})
</script>

<template>
  <div style="display:flex; gap:8px; align-items:center; margin-bottom:12px;">
    <input
      v-model.number="productId"
      type="number"
      min="1"
      placeholder="ID"
      style="width:120px;"
    />
    <button
      @click="loadProduct"
      :disabled="loading"
      style="
        padding: 6px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color .2s;
      "
    >
      {{ loading ? 'Загрузка…' : 'Загрузить' }}
    </button>
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
    <pre><code class="json">{{ JSON.stringify(product, null, 2) }}</code></pre>
  </div>
</template>
