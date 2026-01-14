# DropMe 🚕

**Automated Transport Fare Calculation System**

🌐 **Live Demo:** [https://dropme.saadmaz.com](https://dropme.saadmaz.com)

---

## 📌 Project Overview

**DropMe** is a full-stack, automated transport fare calculation and receipt generation system designed for the fictional **Kingdom of Miranda**.
The system replaces manual fare calculation with a **rule-based digital pricing engine** that computes transport costs based on:

* Origin & destination cities
* Selected vehicle type
* Promotional discounts and probabilistic incentives

> 🎓 **Academic Context**
> This project was originally assigned as a **Python backend-only university coursework**.
> However, the scope was intentionally extended to include:
>
> * A full **React frontend**
> * A **REST API**
> * **Serverless deployment on Vercel**
>
> This demonstrates end-to-end system design, not just backend logic.

---

## 🏗️ System Architecture

DropMe follows a **decoupled full-stack architecture**, separating UI and business logic for scalability and clarity.

```
React (Vite) Frontend
        ↓ JSON POST
Python Flask API (Serverless)
        ↓
Fare Calculation Engine
```

---

## 🎨 Frontend (React + Vite)

The frontend provides a fast, responsive user experience.

### Features

* City selection from standardized locations
* Vehicle type selection
* Promo code input
* Real-time fare calculation
* Clean UI with immediate feedback

### Supported Cities

* Alvin
* Jamz
* Razi
* Mali
* Zuhar

### Tech Stack

* **React**
* **Vite**
* **Fetch API (JSON POST requests)**

---

## ⚙️ Backend API (Python + Flask)

The backend acts as the **core pricing engine** and validation layer.

### Structure

```
/api
 ├── app.py     # API gateway & request handler
 └── logic.py   # Fare calculation engine
```

### Key Responsibilities

* Input validation
* Distance lookup
* Vehicle multiplier application
* Discount logic execution
* JSON-based response handling

### Backend Technologies

* **Python**
* **Flask**
* **Flask-CORS**
* **Serverless Functions (Vercel)**

---

## 🧠 Fare Calculation Logic

### 📍 Distance Matrix (KMD)

| From / To | Alvin | Jamz | Razi | Mali | Zuhar |
| --------- | ----- | ---- | ---- | ---- | ----- |
| **Alvin** | 0     | 20   | 40   | 40   | 20    |
| **Jamz**  | 20    | 0    | 20   | 40   | 40    |
| **Razi**  | 40    | 20   | 0    | 20   | 40    |
| **Mali**  | 40    | 40   | 20   | 0    | 20    |
| **Zuhar** | 20    | 40   | 40   | 20   | 0     |

---

### 🚘 Vehicle Multipliers

| Vehicle | Multiplier           |
| ------- | -------------------- |
| Trishaw | Base Fare            |
| Car     | Increased Multiplier |
| Van     | Highest Multiplier   |

*(Exact values are enforced in `logic.py`)*

---

### 🎁 Discounts & Promotions

#### 1️⃣ Promo Codes

* Valid codes: `pro1` → `pro15`
* Discount equals code number

  * Example: `pro10` → **10 KMD discount**

#### 2️⃣ Random Reduction

* Triggered **only if no promo code is used**
* **33.33% probability** (1 in 3 chance)
* Flat **5 KMD reduction**

---

## ☁️ Deployment (Vercel)

The project is fully deployed using **Vercel’s Serverless Architecture**.

### Highlights

* `/api/*` routes mapped to Python backend
* Frontend served as a static React build
* Stateless execution (no file writes)
* Fast global edge deployment

### `vercel.json` Routing

* Frontend → React app
* Backend → Python Flask API

---

## 🛡️ Error Handling & Validation

* Invalid city names are gracefully handled
* Promo code validation prevents crashes
* Full `try-except` protection in backend logic
* Always returns structured JSON responses

---

## 📦 Data Handling

* No physical file storage (serverless limitation)
* All results returned as **JSON**
* Designed for scalability and cloud execution

---

## 🚀 Live Application

👉 **[https://dropme.saadmaz.com](https://dropme.saadmaz.com)**

---

## 🧑‍🎓 Academic Note

This project was completed as part of a **university coursework requirement** that focused **only on building a Python backend**.

The following were **additional, self-initiated enhancements**:

* Full React frontend
* API integration
* Cloud deployment
* UI/UX design
* Production-ready architecture

---

## 📜 License

This project is intended for **educational and demonstration purposes**.
