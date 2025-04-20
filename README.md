# 📅 Calendar Configuration App (Nuxt 3 + Pinia + DevExtreme)

This project is a calendar management application built with **Nuxt 3**, featuring **DevExtreme DataGrid**, **Tailwind CSS**, **Pinia**, and mock APIs. It enables the management of calendar configurations such as shift types, public holidays, states, and agencies—all within a responsive and user-friendly interface.

---

## 🚀 Installation

Follow the steps below to run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/minionsrahat/calender-management-system.git
cd calender-management-system

# 2. Install dependencies
npm install

# 3. Run the Nuxt development server
npm run dev

```


---

## 🛠️ Technologies Used

- **Nuxt 3** – Full-stack Vue 3 framework with SSR support
- **Pinia** – Modern and lightweight state management library (Vuex alternative)
- **Tailwind CSS** – Utility-first CSS framework for rapid and customizable UI development
- **DevExtreme DataGrid** – Feature-rich data table with search, pagination, inline editing, and more
- **Mocker API** – Utilizes Nuxt's `server/mocker` directory to simulate backend APIs
- **Composition API & `<script setup>`** – Clean, modular, and scalable Vue development pattern

---

## 🧠 Project Overview & Features

### 🔧 Mock API with Nuxt Server Mocker

To support development without a backend, mock APIs are defined under the `server/mocker` directory. These endpoints simulate backend behavior by returning mock JSON data and supporting both `GET` and `POST` operations.

**Available mock endpoints:**

- `/api/agencies` – Retrieve or add agency data
- `/api/states` – Retrieve or add state data
- `/api/holidays` – Manage the public holiday list
- `/api/shifts` – Fetch shift types and update daily shift timing

---

### 🗃️ Pinia for Global State Management

The app uses **Pinia** to maintain a consistent, centralized state across components. This ensures data reactivity and easy access across the app without relying on prop drilling or excessive event handling.

**Stores include:**

- **Agencies Store** – Manages agency records globally
- **States Store** – Holds and updates state information
- **Holidays Store** – Handles public holiday data management

---

### ♻️ Reusability & Modular Design

- **Reusable Table Components** – Implemented using DevExtreme’s DataGrid for handling data lists such as agencies, states, and holidays
- **BaseModal Components** – Dynamically load modal windows for selecting or managing different types of data
- **Shift Type Configuration** – Enables users to select a shift type and view/edit per-day timings using a row-based editable table layout

