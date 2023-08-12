<template>
  <v-container>
    <template slot="activator" slot-scope="{ props }">
      <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
    </template>
    <div v-for="(item, key) in trainings" :key="key">
      <h2>{{ item.type }}</h2>
      <img :src="getImageForType(item.type)" style="height: 100px" alt="img" />
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
            <th class="text-left">Подход&nbsp;1</th>
            <th class="text-left">Подход&nbsp;2</th>
            <th class="text-left">Подход&nbsp;3</th>
            <th class="text-left">Подход&nbsp;4</th>
            <th class="text-left">Подход&nbsp;5</th>
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
                {{ exercise.sets[i - 1].weight }}&nbsp;x&nbsp;{{
                  exercise.sets[i - 1].reps
                }}
                <!-- <span class="gray">кг</span>-->
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
import trainings from '@/data/trainings.json'
// Image
import shouldersImg from '@/assets/shouldersImg.jpg'
import chestImg from '@/assets/chestImg.jpg'
import backImg from '@/assets/backImg.jpg'
// Modal
import Modal from '@/components/Modal.vue'
// moment
import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')

export default {
  data() {
    return {
      trainings,
      reps: null,
      note: null,
      exercises: null,
    }
  },
  components: {
    Modal,
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD.MM.YYYY')
    },
    formatDayOfWeek(date) {
      return moment(date).format('dddd')
    },
    formatTime(date) {
      return moment(date).format('HH:mm')
    },
    calculateTotalTime(startTime, endTime) {
      const startMoment = moment(startTime)
      const endMoment = moment(endTime)
      const duration = moment.duration(endMoment.diff(startMoment))
      return (
        `${Math.floor(duration.asHours())} ч` +
        ` ${Math.floor(duration.asMinutes() % 60)} мин`
      )
    },

    getImageForType(type) {
      const imageMap = {
        плечи: shouldersImg,
        грудь: chestImg,
        спина: backImg,
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
  font-size: 14px;
}
</style>
