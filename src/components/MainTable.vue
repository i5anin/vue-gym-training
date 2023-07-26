<template>
  <v-container>
    <div v-for="(item, key) in data" :key="key">
      <h2>{{ item.type }}</h2>
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
            <td>
              <v-edit-dialog
                :return-value.sync="exercise.sets[0].weight"
                @save="save"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                {{ exercise.sets[0].weight }}
                <span class="gray">кг</span> x {{ exercise.sets[0].reps }}
                <template #input>
                  <div class="mt-2">
                    <v-text-field
                      v-model="exercise.sets[0].weight"
                      label="Weight"
                      single-line
                      counter
                    ></v-text-field>
                  </div>
                </template>
              </v-edit-dialog>
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
import data from '@/data/data.json'
import Vue from 'vue'
import { createVuetify, VTable, VEditDialog } from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VTable,
    VEditDialog,
  },
})

export default {
  data() {
    return {
      data,
      valid: true,
      newExercise: {
        name: '',
        description: '',
        sets: [],
      },
      rules: {
        required: (value) => !!value || 'Required.',
      },
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
    addExercise() {
      if (this.$refs.form.validate()) {
        this.item.exercises.push(this.newExercise)
        this.newExercise = {
          name: '',
          description: '',
          sets: [],
        }
      }
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
