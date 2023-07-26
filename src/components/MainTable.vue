<template>
  <v-container>
    <div v-for="(item, key) in data" :key="key">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Номер</th>
            <th class="text-left">Дата</th>
            <th class="text-left">День недели</th>
            <th class="text-left">Начало</th>
            <th class="text-left">Окончание</th>
            <th class="text-left">Всего</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in data" :key="key">
            <td>{{ key }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.day_of_week }}</td>
            <td>{{ item.start_time }}</td>
            <td>{{ item.end_time }}</td>
            <td>{{ calculateTotalTime(item.start_time, item.end_time) }}</td>
          </tr>
        </tbody>
      </v-table>
      <h2>{{ item.type }}</h2>
      <br />
      <v-table>
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
        <tbody>
          <tr v-for="exercise in item.exercises" :key="exercise.name">
            <td>
              <p>{{ exercise.name }}</p>
              <p class="gray">{{ exercise.description }}</p>
            </td>
            <td v-for="i in 5" :key="i">
              <template v-if="exercise.sets[i - 1]">
                {{ exercise.sets[i - 1].weight }}
                <a class="gray">кг</a>
                x {{ exercise.sets[i - 1].reps }}
              </template>
            </td>
          </tr>
        </tbody>
      </v-table>
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
