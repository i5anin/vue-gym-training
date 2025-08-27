<template>
  <div class="container my-4">
    <div v-for="(item, key) in trainings" :key="key" class="mb-5">
      <div class="d-flex align-items-center gap-3 mb-3">
        <img
          v-if="getImageForType(item.type)"
          :src="getImageForType(item.type)"
          alt="img"
          class="training-img rounded"
        />
        <h2 class="h4 mb-0">{{ item.type }}</h2>
      </div>

      <div class="table-responsive">
        <table class="table table-sm align-middle mb-3">
          <thead>
          <tr>
            <th class="text-start">Номер</th>
            <th class="text-start">Дата</th>
            <th class="text-start">День недели</th>
            <th class="text-start">Начало</th>
            <th class="text-start">Окончание</th>
            <th class="text-start">Всего</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ key }}</td>
            <td>{{ formatDate(item.startTime) }}</td>
            <td class="text-capitalize">{{ formatDayOfWeek(item.startTime) }}</td>
            <td>{{ formatTime(item.startTime) }}</td>
            <td>{{ formatTime(item.endTime) }}</td>
            <td>{{ calculateTotalTime(item.startTime, item.endTime) }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="table-responsive">
        <table class="table table-sm align-middle">
          <thead>
          <tr>
            <th class="text-start">Упражнения</th>
            <th class="text-start">Подход&nbsp;1</th>
            <th class="text-start">Подход&nbsp;2</th>
            <th class="text-start">Подход&nbsp;3</th>
            <th class="text-start">Подход&nbsp;4</th>
            <th class="text-start">Подход&nbsp;5</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(exercise, index) in item.exercises" :key="exercise.name">
            <td>
              <p class="mb-1">{{ index + 1 }}. {{ exercise.name }}</p>
              <p class="text-secondary small mb-0">{{ exercise.description }}</p>
            </td>
            <td v-for="i in 5" :key="i">
              <template v-if="exercise.sets[i - 1]">
                {{ exercise.sets[i - 1].weight }}&nbsp;x&nbsp;{{ exercise.sets[i - 1].reps }}
                <div class="text-secondary small">{{ exercise.sets[i - 1].note }}</div>
              </template>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import trainings from '@/data/trainings.json'
import shouldersImg from '@/assets/shouldersImg.jpg'
import chestImg from '@/assets/chestImg.jpg'
import backImg from '@/assets/backImg.jpg'

const fmtDate = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
const fmtTime = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false })
const fmtWeekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'long' })

const formatDate = d => fmtDate.format(new Date(d))
const formatTime = d => fmtTime.format(new Date(d))
const formatDayOfWeek = d => fmtWeekday.format(new Date(d)).toLowerCase()

const calculateTotalTime = (startTime, endTime) => {
  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()
  const totalMin = Math.max(0, Math.floor((end - start) / 60000))
  const h = Math.floor(totalMin / 60)
  const m = totalMin % 60
  return `${h} ч ${m} мин`
}

const hasType = (itemType, type) => typeof itemType === 'string' && itemType.toLowerCase().includes(type)
const getImageForType = type => {
  if (hasType(type, 'плечи')) return shouldersImg
  if (hasType(type, 'грудь')) return chestImg
  if (hasType(type, 'спина')) return backImg
  return ''
}
</script>

<style scoped>
.training-img {
  height: 100px;
  object-fit: cover;
}
</style>
