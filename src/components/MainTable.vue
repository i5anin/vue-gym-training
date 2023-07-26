<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Номер</th>
          <th class="text-left">Дата</th>
          <th class="text-left">День недели</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in data" :key="key">
          <td>{{ key }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.day_of_week }}</td>
        </tr>
      </tbody>
    </v-table>
    {{ data['01'].type }}
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Начало</th>
          <th class="text-left">Окончание</th>
          <th class="text-left">Всего</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in data" :key="key">
          <td>{{ item.start_time }}</td>
          <td>{{ item.end_time }}</td>
          <td>{{ item.start_time - item.end_time }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import data from '@/data/data.json'

export default {
  data() {
    return {
      data,
    }
  },
  mounted() {
    console.log(data['01'])
  },
}
</script>

<style scoped></style>
