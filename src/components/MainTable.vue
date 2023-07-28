<template>
  <v-container>
    <div v-for="(item, key) in data" :key="key">
      <h2>{{ item.type }}</h2>
      <img
        v-if="hasType(item.type, 'плечи')"
        :src="plechiImage"
        style="height: 100px"
      />
      <img
        v-if="hasType(item.type, 'спина')"
        :src="backImage"
        style="height: 100px"
      />
      <img
        v-if="hasType(item.type, 'грудь')"
        :src="chestImage"
        style="height: 100px"
      />
      <br />
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
          <tr>
            <td>{{ key }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.day_of_week }}</td>
            <td>{{ item.start_time }}</td>
            <td>{{ item.end_time }}</td>
            <td>{{ calculateTotalTime(item.start_time, item.end_time) }}</td>
          </tr>
        </tbody>
      </v-table>
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
          <tr v-for="(exercise, index) in item.exercises" :key="exercise.name">
            <td>
              <p>{{ index + 1 }}. {{ exercise.name }}</p>
              <p class="gray">{{ exercise.description }}</p>
            </td>
            <td v-for="i in 5" :key="i">
              <template v-if="exercise.sets[i - 1]">
                {{ exercise.sets[i - 1].weight }}
                <span class="gray">кг</span>
                x {{ exercise.sets[i - 1].reps }}
                <div class="gray">{{ exercise.sets[i - 1].note }}</div>
              </template>
            </td>
          </tr>
        </tbody>
      </v-table>
      <br />
      <br />
    </div>
  </v-container>
</template>

<script>
import plechiImage from '@/assets/plechiImage.jpeg'
import chestImage from '@/assets/chestImage.jpeg'
import backImage from '@/assets/backImage.jpg'
import data from '@/data/data.json'

export default {
  data() {
    return {
      data,
      plechiImage,
      chestImage,
      backImage,
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
    hasType(itemType, type) {
      return itemType && itemType.toLowerCase().includes(type)
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
