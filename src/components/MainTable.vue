<template>
  <v-container>
    <div v-for="(item, key) in data" :key="key">
      <h2>{{ item.type }}</h2>
      <img :src="getImageForType(item.type)" style="height: 100px"  alt="img"/>
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
            <td>{{ formatDate(item.startTime) }}</td>
            <td>{{ formatDayOfWeek(item.startTime) }}</td>
            <td>{{ formatTime(item.startTime) }}</td>
            <td>{{ formatTime(item.endTime) }}</td>
            <td>{{ calculateTotalTime(item.startTime, item.endTime) }}</td>
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
<!--                <span class="gray">кг</span>-->
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
import shouldersImage from '@/assets/shouldersImage.jpeg'
import chestImage from '@/assets/chestImage.jpeg'
import backImage from '@/assets/backImage.jpg'
import data from '@/data/data.json'
import moment from 'moment'
import 'moment/locale/ru'


export default {
  data() {
    return {
      data,
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD.MM.YYYY')
    },
    formatDayOfWeek(date) {
      return moment(date).format('dd')
    },
    formatTime(date) {
      return moment(date).format('HH:mm')
    },
    calculateTotalTime(startTime, endTime) {
      console.log(`startTime: ${startTime}, endTime: ${endTime}`)
    }
,
    getImageForType(type) {
      const imageMap = {
        плечи: shouldersImage,
        грудь: chestImage,
        спина: backImage,
      }
      return this.hasType(type, 'плечи')
        ? imageMap['плечи']
        : this.hasType(type, 'грудь')
        ? imageMap['грудь']
        : this.hasType(type, 'спина')
        ? imageMap['спина']
        : ''
    },
    hasType(itemType, type) {
      return itemType && itemType.toLowerCase().includes(type)
    },
  },
  // created() {
  //   moment.locale('ru')
  // },
}
</script>

<style scoped>
.gray {
  color: gray;
  font-size: 10px;
}
</style>
