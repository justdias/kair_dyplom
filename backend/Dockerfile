# Базовый образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код
COPY . .

# Компилируем TypeScript в JavaScript
RUN npm run build

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["node", "dist/main"]
