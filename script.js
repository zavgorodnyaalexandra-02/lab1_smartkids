// 1. Початковий масив з 10 курсів
let courses = [
  { id: 101, title: "Маленький математик", author: "Петренко І. В.", instructors: ["Петренко І. В.", "Сидоренко О. М."], taskType: "Пазли", viewsDay1: 150, viewsDay2: 120, duration: { hours: 12, minutes: 30 } },
  { id: 102, title: "Читаємо легко", author: "Авраменко О. М.", instructors: ["Авраменко О. М."], taskType: "Аудіо-картки", viewsDay1: 200, viewsDay2: 180, duration: { hours: 10, minutes: 0 } },
  { id: 103, title: "Юний дослідник", author: "Василенко К. О.", instructors: ["Василенко К. О.", "Захаров П. Т."], taskType: "Відео-тести", viewsDay1: 90, viewsDay2: 75, duration: { hours: 15, minutes: 45 } },
  { id: 104, title: "Логіка для малят", author: "Бойко О. П.", instructors: ["Бойко О. П."], taskType: "Ігри", viewsDay1: 310, viewsDay2: 290, duration: { hours: 8, minutes: 15 } },
  { id: 105, title: "Англійська абетка", author: "Гринчук М. С.", instructors: ["Гринчук М. С.", "Сміт Д."], taskType: "Флеш-картки", viewsDay1: 180, viewsDay2: 160, duration: { hours: 14, minutes: 20 } },
  { id: 106, title: "Творча майстерня", author: "Даниленко Л. В.", instructors: ["Даниленко Л. В."], taskType: "Відео-уроки", viewsDay1: 110, viewsDay2: 95, duration: { hours: 6, minutes: 50 } },
  { id: 107, title: "Весела фізика", author: "Єрмоленко С. А.", instructors: ["Єрмоленко С. А."], taskType: "Експерименти", viewsDay1: 85, viewsDay2: 110, duration: { hours: 18, minutes: 0 } },
  { id: 108, title: "Світ музики", author: "Жук Н. В.", instructors: ["Жук Н. В."], taskType: "Аудіо-вправи", viewsDay1: 130, viewsDay2: 140, duration: { hours: 9, minutes: 30 } },
  { id: 109, title: "Астрономія для дітей", author: "Зінченко В. М.", instructors: ["Зінченко В. М."], taskType: "3D-моделі", viewsDay1: 220, viewsDay2: 205, duration: { hours: 11, minutes: 10 } },
  { id: 110, title: "Основи кодування", author: "Іванов М. О.", instructors: ["Іванов М. О.", "Коваль С. В."], taskType: "Scratch-завдання", viewsDay1: 400, viewsDay2: 380, duration: { hours: 20, minutes: 0 } }
];

// Допоміжна функція розрахунку тривалості у хвилинах
const getDurationInMinutes = (course) => course.duration.hours * 60 + course.duration.minutes;

// 1.1 Впорядкування курсів за тривалістю та пошук середньої кількості користувачів
function sortCoursesByDurationAndCalcAvgViews(courseArray) {
  const sorted = [...courseArray].sort((a, b) => getDurationInMinutes(a) - getDurationInMinutes(b));
  const totalViews = sorted.reduce((sum, c) => sum + (c.viewsDay1 + c.viewsDay2), 0);
  const avgViews = totalViews / sorted.length;
  return { sorted, avgViews };
}

// 1.2 Пошук курсу з мінімальною кількістю користувачів за добу_2 та вивід внутрішнього ID
function findMinViewsDay2CourseId(courseArray) {
  if (courseArray.length === 0) return null;
  const minCourse = courseArray.reduce((min, c) => (c.viewsDay2 < min.viewsDay2 ? c : min), courseArray[0]);
  return minCourse.id;
}

// 1.3 Додавання нового курсу (перевірка повноти даних)
function addCourse(courseArray, newCourse) {
  const isComplete = newCourse.id && newCourse.title && newCourse.author &&
                     newCourse.instructors && newCourse.instructors.length > 0 &&
                     newCourse.taskType && newCourse.viewsDay1 !== undefined &&
                     newCourse.viewsDay2 !== undefined && newCourse.duration &&
                     newCourse.duration.hours !== undefined && newCourse.duration.minutes !== undefined;

  let resultList = [...courseArray];
  if (!isComplete) {
    resultList.unshift(newCourse);
    console.log("-> Перевірка: Дані неповні! Курс додано на ПОЧАТОК списку.");
  } else {
    resultList.push(newCourse);
    resultList.sort((a, b) => a.author.localeCompare(b.author, "uk"));
    console.log("-> Перевірка: Всі дані присутні! Курс вставлено у список, відсортований за АВТОРОМ.");
  }
  return resultList;
}

// 1.4 Обчислення тривалості вивчення декількох курсів одночасно
function calculateSimultaneousDuration(selectedCourses) {
  const multiplier = selectedCourses.length <= 3 ? 1.0 : 1.5;
  const totalMinutes = selectedCourses.reduce((sum, c) => sum + getDurationInMinutes(c) * multiplier, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);

  return { courseCount: selectedCourses.length, multiplier, hours, minutes, totalMinutes };
}


// ============================================================================
// ЗАВДАННЯ 2: Облікові записи дітей (Об'єктно-орієнтований JS-код)
// ============================================================================

// Клас ChildAccount (Обліковий запис дитини)
class ChildAccount {
  constructor(lastName, firstName, age, email, feedbackGoal, requestDate, requestTime) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.age = age;
    this.email = email;
    this.feedbackGoal = feedbackGoal;
    this.requestDate = new Date(requestDate); // Формат: "YYYY-MM-DD"
    this.requestTime = requestTime;           // Формат: "HH:MM"
  }

  // Метод отримання форматованої дати
  getFormattedDate() {
    return this.requestDate.toISOString().split("T")[0];
  }

  // Метод повернення повного імені
  getFullName() {
    return `${this.lastName} ${this.firstName}`;
  }
}

// Клас ChildRegistry (Менеджер реєстру дітей)
class ChildRegistry {
  constructor(children = []) {
    this.children = children;
  }

  // 2.1 Перелік дітей, батьки яких звернулися у заданий місяць (1-12) та момент часу ("HH:MM")
  filterByMonthAndTime(targetMonth, targetTime) {
    return this.children.filter(child => {
      const month = child.requestDate.getMonth() + 1; // getMonth() повертає 0-11
      return month === targetMonth && child.requestTime === targetTime;
    });
  }

  // 2.2 Мінімальний вік дитини, E-mail та дата звернення
  getMinAgeChildInfo() {
    if (this.children.length === 0) return null;
    const minChild = this.children.reduce((min, c) => (c.age < min.age ? c : min), this.children[0]);
    return {
      minAge: minChild.age,
      email: minChild.email,
      requestDate: minChild.getFormattedDate(),
      fullName: minChild.getFullName()
    };
  }

  // 2.3 Поділ дітей за віком на класи та підрахунок кількості
  categorizeByAgeClasses() {
    const ageClasses = {
      "ранній (до 3-х років включно)": 0,
      "середній (від 3 до 5)": 0,
      "дошкільний (5-7 років)": 0,
      "шкільний (більше 7 років)": 0
    };

    this.children.forEach(c => {
      if (c.age <= 3) {
        ageClasses["ранній (до 3-х років включно)"]++;
      } else if (c.age > 3 && c.age <= 5) {
        ageClasses["середній (від 3 до 5)"]++;
      } else if (c.age > 5 && c.age <= 7) {
        ageClasses["дошкільний (5-7 років)"]++;
      } else {
        ageClasses["шкільний (більше 7 років)"]++;
      }
    });

    return ageClasses;
  }

  // 2.4 Сортування дітей в алфавітному порядку E-mail із виведенням мети зворотного зв'язку
  sortByEmailWithGoal() {
    return [...this.children]
      .sort((a, b) => a.email.localeCompare(b.email))
      .map(c => ({
        email: c.email,
        feedbackGoal: c.feedbackGoal,
        name: c.getFullName()
      }));
  }
}

// 10 облікових записів дітей
const childrenList = [
  new ChildAccount("Іваненко", "Олена", 2, "olena.ivanenko@example.com", "Співпраця", "2026-09-15", "10:30"),
  new ChildAccount("Коваленко", "Максим", 4, "m.kovalenko@example.com", "Пропозиція", "2026-09-15", "14:00"),
  new ChildAccount("Бондаренко", "Анна", 6, "a.bond@example.com", "Скарга", "2026-09-15", "10:30"),
  new ChildAccount("Ткаченко", "Тарас", 8, "taras.t@example.com", "Наявність помилки", "2026-10-01", "09:15"),
  new ChildAccount("Шевченко", "Марія", 1, "masha.sh@example.com", "Співпраця", "2026-09-15", "10:30"),
  new ChildAccount("Кравченко", "Денис", 5, "denis.krav@example.com", "Пропозиція", "2026-11-12", "16:45"),
  new ChildAccount("Олійник", "Софія", 7, "sofia.oli@example.com", "Співпраця", "2026-09-20", "11:00"),
  new ChildAccount("Мельник", "Артем", 3, "artem.mel@example.com", "Наявність помилки", "2026-08-05", "12:00"),
  new ChildAccount("Бойко", "Дарина", 9, "daryna.b@example.com", "Пропозиція", "2026-09-15", "10:30"),
  new ChildAccount("Захарченко", "Лев", 5, "lev.zahar@example.com", "Співпраця", "2026-10-10", "15:20")
];

const registry = new ChildRegistry(childrenList);


// ============================================================================
// ДЕМОНСТРАЦІЯ ТА ТЕСТУВАННЯ РЕЗУЛЬТАТІВ У КОНСОЛІ
// ============================================================================

console.log("=== ТЕСТУВАННЯ ЗАВДАННЯ 1 (КУРСИ) ===");

// 1.1 Сортування за тривалістю та середня кількість
const task1_1 = sortCoursesByDurationAndCalcAvgViews(courses);
console.log("1.1 Курси, відсортовані за зростанням тривалості:");
task1_1.sorted.forEach(c => console.log(`  - [ID: ${c.id}] "${c.title}" — ${c.duration.hours}г ${c.duration.minutes}хв (${getDurationInMinutes(c)} хв)`));
console.log(`Середня кількість зацікавлених користувачів (доба_1 + доба_2): ${task1_1.avgViews.toFixed(2)}`);

// 1.2 Мін. перегляди за добу 2
const minId = findMinViewsDay2CourseId(courses);
console.log(`\n1.2 Внутрішній ID курсу з мінімальними переглядами за добу_2: ${minId}`);

// 1.3 Додавання нового курсу
console.log("\n1.3 Тест додавання повного курсу:");
const completeCourse = { id: 111, title: "Робототехніка", author: "Абрамов В. С.", instructors: ["Абрамов В. С."], taskType: "Конструювання", viewsDay1: 300, viewsDay2: 280, duration: { hours: 15, minutes: 0 } };
const listAfterCompleteAdd = addCourse(courses, completeCourse);
console.log(`Перший автор у відсортованому списку: ${listAfterCompleteAdd[0].author} ("${listAfterCompleteAdd[0].title}")`);

console.log("\n1.3 Тест додавання неповного курсу:");
const incompleteCourse = { title: "Неповна тема", author: "Невідомий" }; // відсутні обов'язкові поля
const listAfterIncompleteAdd = addCourse(courses, incompleteCourse);
console.log(`Перший елемент у списку після додавання: "${listAfterIncompleteAdd[0].title}"`);

// 1.4 Одночасне вивчення курсів
console.log("\n1.4 Тривалість вивчення курсів одночасно:");
const study3 = calculateSimultaneousDuration(courses.slice(0, 3));
console.log(`  - Вивчення 3 курсів (коефіцієнт ${study3.multiplier}): ${study3.hours} год ${study3.minutes} хв`);

const study5 = calculateSimultaneousDuration(courses.slice(0, 5));
console.log(`  - Вивчення 5 курсів (коефіцієнт ${study5.multiplier}): ${study5.hours} год ${study5.minutes} хв`);


console.log("\n==================================================");
console.log("=== ТЕСТУВАННЯ ЗАВДАННЯ 2 (ОБЛІКОВІ ЗАПИСИ ДІТЕЙ) ===");

// 2.1 Перелік дітей за вересень (місяць 9) та 10:30
console.log("\n2.1 Перелік дітей (звернення у вересні о 10:30):");
const september1030 = registry.filterByMonthAndTime(9, "10:30");
september1030.forEach(c => console.log(`  - ${c.getFullName()} (Email: ${c.email}, Дата: ${c.getFormattedDate()})`));

// 2.2 Мін вік
const minAgeInfo = registry.getMinAgeChildInfo();
console.log("\n2.2 Інформація про наймолодшу дитину:");
console.log(`  - ПІБ: ${minAgeInfo.fullName}`);
console.log(`  - Мінімальний вік: ${minAgeInfo.minAge} рік`);
console.log(`  - E-mail: ${minAgeInfo.email}`);
console.log(`  - Дата звернення: ${minAgeInfo.requestDate}`);

// 2.3 Категорії за віком
console.log("\n2.3 Поділ дітей за віком на класи:");
const ageStats = registry.categorizeByAgeClasses();
for (const [ageClass, count] of Object.entries(ageStats)) {
  console.log(`  - Клас "${ageClass}": ${count} діт.`);
}

// 2.4 Сортування за алфавітом E-mail
console.log("\n2.4 Діти, відсортовані за алфавітом E-mail:");
const sortedEmails = registry.sortByEmailWithGoal();
sortedEmails.forEach(item => console.log(`  - ${item.email} | Мета: ${item.feedbackGoal} (${item.name})`));