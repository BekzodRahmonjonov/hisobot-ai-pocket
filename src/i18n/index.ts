import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      analytics: 'Analytics',
      add: 'Add',
      planned: 'Planned',
      settings: 'Settings',
      
      // Welcome & Auth
      welcome: 'Welcome to Hisobot AI',
      subtitle: 'Your Personal Finance Assistant',
      selectLanguage: 'Select Language',
      loginWithPhone: 'Login with Phone',
      loginWithEmail: 'Login with Email',
      loginWithGoogle: 'Login with Google',
      
      // Onboarding
      enterFullName: 'Enter your full name',
      chooseLanguage: 'Choose your preferred language',
      chooseCurrency: 'Choose default currency',
      setBudgetLimit: 'Set monthly budget limit (optional)',
      letsStart: "Let's start managing your money",
      next: 'Next',
      skip: 'Skip',
      
      // Dashboard
      totalBalance: 'Total Balance',
      thisMonth: 'This Month',
      income: 'Income',
      expenses: 'Expenses',
      topCategory: 'Top Category',
      alerts: 'Alerts & AI Recommendations',
      quickActions: 'Quick Actions',
      addIncome: 'Add Income',
      addExpense: 'Add Expense',
      addDebt: 'Add Debt',
      
      // Transactions
      amount: 'Amount',
      category: 'Category',
      date: 'Date',
      notes: 'Notes',
      source: 'Source',
      save: 'Save',
      
      // Categories
      food: 'Food',
      transport: 'Transport',
      shopping: 'Shopping',
      entertainment: 'Entertainment',
      utilities: 'Utilities',
      healthcare: 'Healthcare',
      salary: 'Salary',
      freelance: 'Freelance',
      
      // Common
      currency: 'Currency',
      language: 'Language',
      cancel: 'Cancel',
      confirm: 'Confirm',
      delete: 'Delete',
      edit: 'Edit',
    }
  },
  uz: {
    translation: {
      // Navigation
      home: 'Bosh sahifa',
      analytics: 'Tahlil',
      add: 'Qoʻshish',
      planned: 'Rejalashtirilgan',
      settings: 'Sozlamalar',
      
      // Welcome & Auth
      welcome: 'Hisobot AI ga xush kelibsiz',
      subtitle: 'Shaxsiy moliyaviy yordamchingiz',
      selectLanguage: 'Tilni tanlang',
      loginWithPhone: 'Telefon raqami bilan kirish',
      loginWithEmail: 'Email bilan kirish',
      loginWithGoogle: 'Google bilan kirish',
      
      // Onboarding
      enterFullName: 'To\'liq ismingizni kiriting',
      chooseLanguage: 'Tilni tanlang',
      chooseCurrency: 'Asosiy valyutani tanlang',
      setBudgetLimit: 'Oylik byudjet limitini belgilang (ixtiyoriy)',
      letsStart: 'Pulingizni boshqarishni boshlaylik',
      next: 'Keyingi',
      skip: 'O\'tkazib yuborish',
      
      // Dashboard
      totalBalance: 'Umumiy balans',
      thisMonth: 'Shu oy',
      income: 'Daromad',
      expenses: 'Xarajatlar',
      topCategory: 'Asosiy kategoriya',
      alerts: 'Ogohlantirishlar va AI tavsiyalar',
      quickActions: 'Tezkor harakatlar',
      addIncome: 'Daromad qo\'shish',
      addExpense: 'Xarajat qo\'shish',
      addDebt: 'Qarz qo\'shish',
      
      // Transactions
      amount: 'Miqdor',
      category: 'Kategoriya',
      date: 'Sana',
      notes: 'Izoh',
      source: 'Manba',
      save: 'Saqlash',
      
      // Categories
      food: 'Oziq-ovqat',
      transport: 'Transport',
      shopping: 'Xarid',
      entertainment: 'Ko\'ngilochar',
      utilities: 'Kommunal xizmatlar',
      healthcare: 'Tibbiyot',
      salary: 'Maosh',
      freelance: 'Freelans',
      
      // Common
      currency: 'Valyuta',
      language: 'Til',
      cancel: 'Bekor qilish',
      confirm: 'Tasdiqlash',
      delete: 'O\'chirish',
      edit: 'Tahrirlash',
    }
  },
  ru: {
    translation: {
      // Navigation
      home: 'Главная',
      analytics: 'Аналитика',
      add: 'Добавить',
      planned: 'Запланированное',
      settings: 'Настройки',
      
      // Welcome & Auth
      welcome: 'Добро пожаловать в Hisobot AI',
      subtitle: 'Ваш персональный финансовый помощник',
      selectLanguage: 'Выберите язык',
      loginWithPhone: 'Вход по номеру телефона',
      loginWithEmail: 'Вход по Email',
      loginWithGoogle: 'Вход через Google',
      
      // Onboarding
      enterFullName: 'Введите ваше полное имя',
      chooseLanguage: 'Выберите предпочитаемый язык',
      chooseCurrency: 'Выберите основную валюту',
      setBudgetLimit: 'Установите лимит месячного бюджета (необязательно)',
      letsStart: 'Давайте начнем управлять вашими деньгами',
      next: 'Далее',
      skip: 'Пропустить',
      
      // Dashboard
      totalBalance: 'Общий баланс',
      thisMonth: 'В этом месяце',
      income: 'Доходы',
      expenses: 'Расходы',
      topCategory: 'Главная категория',
      alerts: 'Уведомления и рекомендации ИИ',
      quickActions: 'Быстрые действия',
      addIncome: 'Добавить доход',
      addExpense: 'Добавить расход',
      addDebt: 'Добавить долг',
      
      // Transactions
      amount: 'Сумма',
      category: 'Категория',
      date: 'Дата',
      notes: 'Заметки',
      source: 'Источник',
      save: 'Сохранить',
      
      // Categories
      food: 'Еда',
      transport: 'Транспорт',
      shopping: 'Покупки',
      entertainment: 'Развлечения',
      utilities: 'Коммунальные услуги',
      healthcare: 'Здравоохранение',
      salary: 'Зарплата',
      freelance: 'Фриланс',
      
      // Common
      currency: 'Валюта',
      language: 'Язык',
      cancel: 'Отмена',
      confirm: 'Подтвердить',
      delete: 'Удалить',
      edit: 'Редактировать',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;