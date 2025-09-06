import { defineConfig } from 'vitepress'

// Справочник типов тренировок
const trainingTypes: Record<number, string> = {
  1: 'Спина и руки (бицепс)',
  2: 'Грудь и руки (трицепс)',
  19: 'Плечи и пресс',
  55: 'Грудь икры',
  56: 'Плечи'
  // остальные можно заполнить по мере добавления
}

// Генерация массива 1–300
const trainingSidebar = Array.from({ length: 300 }, (_, i) => {
  const n = i + 1
  const type = trainingTypes[n] ?? ''
  return {
    text: type ? `Т${n} — ${type}` : `Тренировка ${n}`,
    link: `/training/${n}`
  }
})

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
        text: 'Тренировки',
        items: trainingSidebar
      }
    ],
    outline: {
      level: [2, 3],
      label: 'Содержание'
    }
  }
})
