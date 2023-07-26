<template>
  <v-container>
    <div v-for="(item, key) in data" :key="key">
      <v-card class="mb-3">
        <v-card-title>
          <div class="headline">{{ item.type }}</div>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Дата</th>
                  <th class="text-left">День недели</th>
                  <th class="text-left">Начало</th>
                  <th class="text-left">Окончание</th>
                  <th class="text-left">Всего</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ item.date }}</td>
                  <td>{{ item.day_of_week }}</td>
                  <td>{{ item.start_time }}</td>
                  <td>{{ item.end_time }}</td>
                  <td>
                    {{ calculateTotalTime(item.start_time, item.end_time) }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-divider class="my-3"></v-divider>

          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Упражнения</th>
                  <th class="text-left">Подход 1</th>
                  <th class="text-left">Подход 2</th>
                  <th class="text-left">Подход 3</th>
                  <th class="text-left">Подход 4</th>
                  <th class="text-left">Подход 5</th>
                </tr>
              </thead>

              <tbody v-for="exercise in item.exercises" :key="exercise.name">
                <tr :key="exercise.name">
                  <td colspan="6">
                    {{ exercise.name }}
                    {{ exercise.description }}
                  </td>
                </tr>
                <tr :key="exercise.name + '-sets'"></tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </div>
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
  methods: {
    calculateTotalTime(startTime, endTime) {
      const start = new Date(`1970/01/01 ${startTime}`)
      const end = new Date(`1970/01/01 ${endTime}`)
      const diff = end - start
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor(
        (diff - hours * (1000 * 60 * 60)) / (1000 * 60)
      )
      return `${hours}:${minutes.toString().padStart(2, '0')}`
    },
  },
}
</script>

<style scoped>
.gray {
  color: gray;
  font-size: 10px;
}
</style>
