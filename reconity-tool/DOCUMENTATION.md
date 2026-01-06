# RECONITY
> **Your Trusted Companion in this DigitalWorld.**

![Reconity Logo](https://raw.githubusercontent.com/binayakpandit/Reconity_Tool/main/web-client/public/logo.png)

---

## 🚀 Executive Summary

**Reconity** is a next-generation cybersecurity platform designed to democratize vulnerability assessment. Unlike fragmented legacy tools that require complex command-line knowledge, Reconity provides a unified, visual, and automated experience.

**Mission:** To provide a "One Dashboard, One Click" security solution for pentesters, SOC analysts, and enterprises.

**Current Status:** `Production Ready (MVP)`

---

## 🏗️ High-Level Architecture

Reconity utilizes a modern **Microservices Architecture** to ensure scalability, fault tolerance, and security.

```mermaid
graph TD
    Client[Web Client (React)] -->|HTTPS| API[API Gateway (Node.js)]
    API -->|Auth| DB[(SQLite/Postgres)]
    API -->|Jobs| Redis[(Redis Queue)]
    Redis -->|Pull| Worker[Scan Worker]
    Worker -->|Execute| Tools[Security Tools (Subfinder, etc.)]
    Worker -->|Update| DB
```

### Core Components

1.  **Reconity Web Client**:
    *   **Tech**: React, TypeScript, Vite, TailwindCSS.
    *   **Role**: The command center. Provides a secure dashboard for managing targets and viewing results.
2.  **API Gateway**:
    *   **Tech**: Node.js, Express, Prisma.
    *   **Role**: Central brain. Handles authentication (JWT), rate limiting, and business logic.
3.  **Scan Engine**:
    *   **Tech**: BullMQ, Redis, Go-based Tools.
    *   **Role**: The muscle. Executes resource-intensive scans asynchronously without blocking the user interface.

---

## ✨ Key Features

### 1. Zero-Config Authentication
Enterprise-grade security out of the box.
*   **Secure**: JWT-based stateless authentication.
*   **Hashed**: Passwords secured with Bcrypt.
*   **Protected**: Middleware middleware ensures zero unauthorized access.

### 2. Intelligent Target Management
Adding a target is as simple as typing a domain.
*   **Validation**: Automatic domain verification.
*   **Organization**: Historical tracking of all assets.

### 3. Dual-Mode Scanning
*   **⚡ Quick Scan**: Leverages passive OSINT sources (crt.sh) to discover subdomains in *seconds* with zero footprint.
*   **🔍 Full Scan**: Activates the active reconnaissance engine (Subfinder) to unearth deep, hidden assets using advanced DNS enumeration.

### 4. Real-Time Job Queue
Built-in job processing system that can scale from 1 to 1000s of concurrent scans using Redis-backed queues.

---

## 🛠️ Technical Specifications

| Component | Technology | Version |
| :--- | :--- | :--- |
| **Frontend** | React + TypeScript | 18.x |
| **Styling** | TailwindCSS | 3.x |
| **Backend** | Node.js + Express | 20.x |
| **Database** | SQLite (Dev) / Postgres (Prod) | - |
| **ORM** | Prisma | 5.x |
| **Queue** | Redis + BullMQ | - |
| **Infrastructure** | Docker Support | Ready |

---

## 🗺️ Roadmap & Future Vision

*   **Q2 2026**: Integration of `httpx` for live probing and screenshots.
*   **Q3 2026**: AI-driven vulnerability correlation (LLM integration).
*   **Q4 2026**: Enterprise Reporting (PDF/Compliance).

---

*Verified by Reconity DevSecOps Team*
*Last Updated: 2026-01-07*
