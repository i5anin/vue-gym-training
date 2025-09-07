import { defineConfig } from 'vitepress'

// Справочник типов тренировок
const trainingTypes: Record<number, string> = {
  1: 'Спина и руки (бицепс)',
  2: 'Грудь и руки (трицепс)',
  19: 'Плечи и пресс',
  55: 'Грудь икры',
  56: 'Плечи',
  57: 'Ноги',
  58: 'Руки',
  59: 'Спина',
  // остальные можно заполнить по мере добавления
}

// Функция генерации массива тренировок
function makeTrainings(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => {
    const n = start + i
    const type = trainingTypes[n] ?? ''
    return {
      text: type ? `Т${n} — ${type}` : `Тренировка ${n}`,
      link: `/training/${n}`
    }
  })
}

export default defineConfig({
  lang: 'ru-RU',
  title: 'Тренировка',
  description: 'Документация',
  cleanUrls: true,

  themeConfig: {
    siteTitle: 'Мои тренировки',
    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Подготовка', link: '/docs' },
      { text: 'Контакты', link: '/contact' }
    ],
    sidebar: [
      {
        text: 'Листы',
        items: makeTrainings(1, 54)
      },
      {
        text: 'Книжка (55-178) 123',
        items: makeTrainings(55, 178)
      },
      {
        text: 'Тетрадь КГТА (179-223) 44',
        items: makeTrainings(179, 223)
      },
      {
        text: 'Тетрадь (223-',
        items: makeTrainings(223, 270)
      }
      // при желании можно добавить дальше
    ],
    outline: {
      level: [2, 3],
      label: 'Содержание'
    }
  }
})
