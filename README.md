# ms-reminder

🌐 **Documentação / Documentation**  
🗣️ **Disponível em / Available in:**
* 🇧🇷 [Português](#-documentação-em-português)
* 🇺🇸 [English](#-documentation-in-english)

---

## 🇧🇷 Documentação em Português

## 🧾 Descrição

Microserviço de lembretes para envio via **e‑mail** ou **WhatsApp**, construído com Node.js, TypeScript, Express, MongoDB e Redis (BullMQ).

---

## 📦 Tecnologias

* **Node.js** (v18+)
* **TypeScript**
* **Express**
* **MongoDB** + Mongoose
* **Redis** + BullMQ
* **Nodemailer** (SMTP)
* **Axios** (para integração WhatsApp)
* **Joi** (validação)
* **ESLint** + **Prettier**
* **Docker** + **Docker Compose** (opcional)

---

## 🚀 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/JPabloVM/ms-reminder.git
   cd ms-reminder
   ```

2. Copie o arquivo de exemplo de variáveis de ambiente e ajuste conforme necessário:

   ```bash
   cp .dev.env .env
   ```

   Edite `.env` e preencha os valores:

   ```env
   PORT=5000
   DATABASE_CONNECTION_URI=mongodb://<user>:<pass>@localhost:27017
   DATABASE_NAME=ms_reminder_db

   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_USERNAME=<usuário>
   REDIS_PASSWORD=<senha>

   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL=<seu-email>
   EMAIL_PASSWORD=<sua-senha>

   # Chave interna para autenticação de rotas protegidas (authenticateInternal)
   PRIVATE_KEY=<sua-chave-interna-ou-token-secreto>
   ```

3. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

4. Gere suas chaves RSA para JWT (não versionar estas chaves no Git):

   ```bash
   openssl genpkey \
     -algorithm RSA \
     -out private.key \
     -pkeyopt rsa_keygen_bits:2048

   openssl rsa \
     -pubout \
     -in private.key \
     -out public.key
   ```

---

## 🛠️ Scripts úteis

* **Dev** (watch + reload):

  ```bash
  npm run dev
  # ou
  yarn dev
  ```
* **Build + start** (produção):

  ```bash
  npm run start
  # ou
  yarn start
  ```
* **Rodar Docker (dev)**:

  ```bash
  docker-compose -f docker-compose-dev.yml up --build
  ```
* **Gerar docs** (TypeDoc):

  ```bash
  npm run docs
  # ou
  yarn docs
  ```
* **Lint**

  ```bash
  npm run lint
  npm run lint:fix
  ```

---

## 📡 Endpoints principais

### 🔐 Autenticação

* JWT (usuário comum): `Authorization: Bearer <jwt_token>`
* Interna (rotas protegidas): `Authorization: Bearer <PRIVATE_KEY>`

### 🔐 Auth / Usuário

* `POST /auth/register` – registra novo usuário
* `POST /auth/login`    – autentica e retorna JWT
* `GET /users`          – lista usuários (authenticateInternal)

  ```http
  Authorization: Bearer <PRIVATE_KEY>
  ```

### ⏰ Lembretes

*Todos os endpoints requerem:* `Authorization: Bearer <jwt_token>`

* `POST /reminders` – cria lembrete
* `GET /reminders` – lista lembretes
* `PATCH /reminders/:id` – atualiza lembrete
* `DELETE /reminders/:id` – remove lembrete

**Exemplo de payload para criação:**

```json
{
  "status": "DRAFT",
  "title": "Meu lembrete",
  "message": "Detalhes...",
  "channel": "email",
  "email": "user@mail.com",
  "phoneNumber": 5511999999999,
  "date": "2025-06-01",
  "time": "15:00"
}
```

---

## 📖 Documentação

Gerada via [TypeDoc](https://typedoc.org/) no diretório `docs/`:

```bash
npm run docs
# ou
yarn docs
```

---

## 🤝 Contribuições

1. Fork este repositório
2. Crie uma branch (`git checkout -b feature/x`)
3. Faça suas alterações e commite (`git commit -m 'feat: ...'`)
4. Envie para sua branch (`git push origin feature/x`)
5. Abra um pull request

---

## 📜 Licença

MIT © João Pablo Vilanir de Melo

[🔝 Voltar ao topo](#ms-reminder)

---

## 🇺🇸 Documentation in English

## 🧾 Description

Reminder microservice for sending **email** or **WhatsApp** notifications, built with Node.js, TypeScript, Express, MongoDB and Redis (BullMQ).

---

## 📦 Technologies

* **Node.js** (v18+)
* **TypeScript**
* **Express**
* **MongoDB** + Mongoose
* **Redis** + BullMQ
* **Nodemailer** (SMTP)
* **Axios** (WhatsApp integration)
* **Joi** (validation)
* **ESLint** + **Prettier**
* **Docker** + **Docker Compose** (optional)

---

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JPabloVM/ms-reminder.git
   cd ms-reminder
   ```

2. Copy example env file and update variables:

   ```bash
   cp .dev.env .env
   ```

   Fill `.env` with your data:

   ```env
   PORT=5000
   DATABASE_CONNECTION_URI=mongodb://<user>:<pass>@localhost:27017
   DATABASE_NAME=ms_reminder_db

   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_USERNAME=<user>
   REDIS_PASSWORD=<password>

   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL=<your-email>
   EMAIL_PASSWORD=<your-password>

   # Internal authentication key for protected routes
   PRIVATE_KEY=<your-internal-secret-or-token>
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Generate RSA keys for JWT (do not commit keys to Git):

   ```bash
   openssl genpkey \
     -algorithm RSA \
     -out private.key \
     -pkeyopt rsa_keygen_bits:2048

   openssl rsa \
     -pubout \
     -in private.key \
     -out public.key
   ```

---

## 🛠️ Useful Scripts

* **Dev** (watch + reload):

  ```bash
  npm run dev
  # or
  yarn dev
  ```
* **Build + start** (production):

  ```bash
  npm run start
  # or
  yarn start
  ```
* **Run Docker (dev)**:

  ```bash
  docker-compose -f docker-compose-dev.yml up --build
  ```
* **Generate docs** (TypeDoc):

  ```bash
  npm run docs
  # or
  yarn docs
  ```
* **Lint**:

  ```bash
  npm run lint
  npm run lint:fix
  ```

---

## 📡 Main Endpoints

### 🔐 Authentication

* JWT (standard user): `Authorization: Bearer <jwt_token>`
* Internal (protected routes): `Authorization: Bearer <PRIVATE_KEY>`

### 🔐 Auth / User

* `POST /auth/register` – register new user
* `POST /auth/login`    – authenticate and return JWT
* `GET /users`          – list users (authenticateInternal)

  ```http
  Authorization: Bearer <PRIVATE_KEY>
  ```

### ⏰ Reminders

*All endpoints require:* `Authorization: Bearer <jwt_token>`

* `POST /reminders` – create reminder
* `GET /reminders` – list reminders
* `PATCH /reminders/:id` – update reminder
* `DELETE /reminders/:id` – delete reminder

---

## 📖 Documentation

Generated via [TypeDoc](https://typedoc.org/) in `docs/`:

```bash
npm run docs
# or
yarn docs
```

---

## 🤝 Contributing

1. Fork this repo
2. Create a branch (`git checkout -b feature/x`)
3. Make your changes and commit (`git commit -m 'feat: ...'`)
4. Push to branch (`git push origin feature/x`)
5. Open a pull request

---

## 📜 License

MIT © João Pablo Vilanir de Melo

[🔝 Back to top](#ms-reminder)

---