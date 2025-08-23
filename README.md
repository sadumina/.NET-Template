# 🚀 Full Stack .NET + React Application

[![.NET](https://img.shields.io/badge/.NET-6.0+-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-20+-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> 🎯 A modern full-stack application built with .NET Web API backend, React frontend, and containerized with Docker for seamless deployment.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Prerequisites](#️-prerequisites)
- [⚡ Quick Start](#-quick-start)
- [🐳 Docker Setup](#-docker-setup)
- [📁 Project Structure](#-project-structure)
- [🔧 Development](#-development)
- [🚢 Deployment](#-deployment)
- [📊 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)

## ✨ Features

- 🎨 **Modern React Frontend** - Built with latest React 18+ and functional components
- 🔥 **Robust .NET Backend** - ASP.NET Core Web API with Entity Framework
- 🐳 **Containerized** - Full Docker support with multi-stage builds
- 🔒 **Authentication** - JWT-based authentication and authorization
- 📱 **Responsive Design** - Mobile-first responsive UI
- ⚡ **Real-time Updates** - SignalR integration for live data
- 🗄️ **Database Support** - SQL Server with Entity Framework Core
- 🧪 **Testing Ready** - Unit and integration test setup
- 📈 **Monitoring** - Built-in logging and health checks

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │───▶│  .NET Web API   │───▶│   SQL Server    │
│   (Frontend)    │    │   (Backend)     │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 │
                    ┌─────────────────┐
                    │     Docker      │
                    │  (Containerized)│
                    └─────────────────┘
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| 🔷 .NET SDK | 6.0+ | [Download](https://dotnet.microsoft.com/download) |
| 📦 Node.js | 16+ | [Download](https://nodejs.org/) |
| 🐳 Docker | 20+ | [Download](https://www.docker.com/get-started) |
| 🐙 Git | Latest | [Download](https://git-scm.com/) |

## ⚡ Quick Start

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Environment Setup
```bash
# Copy environment variables
cp .env.example .env

# Update connection strings and API keys in .env file
```

### 3️⃣ Run with Docker (Recommended)
```bash
# Build and start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# API Docs: http://localhost:5000/swagger
```

## 🐳 Docker Setup

### 📦 Using Docker Compose (Easiest)

```yaml
# docker-compose.yml structure
services:
  - 🌐 Frontend (React)
  - 🔧 Backend (.NET API)
  - 🗄️ Database (SQL Server)
  - 🔄 Reverse Proxy (Nginx)
```

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 🏗️ Manual Docker Build

```bash
# Build backend
docker build -t myapp-backend ./Backend

# Build frontend
docker build -t myapp-frontend ./Frontend

# Run with custom network
docker network create myapp-network
docker run -d --network myapp-network --name backend myapp-backend
docker run -d --network myapp-network --name frontend -p 3000:80 myapp-frontend
```

## 📁 Project Structure

```
📦 Project Root
├── 🗂️ Backend/                 # .NET Web API
│   ├── 📄 Controllers/         # API Controllers
│   ├── 📊 Models/              # Data Models
│   ├── 🔧 Services/            # Business Logic
│   ├── 🗄️ Data/               # Entity Framework Context
│   ├── 🧪 Tests/               # Unit Tests
│   └── 🐳 Dockerfile
├── 🗂️ Frontend/                # React Application
│   ├── 📱 src/
│   │   ├── 🧩 components/      # React Components
│   │   ├── 📄 pages/           # Page Components
│   │   ├── 🔧 services/        # API Services
│   │   ├── 🎨 styles/          # CSS/SCSS Files
│   │   └── 🛠️ utils/          # Utility Functions
│   ├── 📦 public/              # Static Assets
│   ├── 🧪 tests/               # Jest Tests
│   └── 🐳 Dockerfile
├── 🐳 docker-compose.yml       # Docker Compose Configuration
├── 🌍 .env.example             # Environment Variables Template
└── 📖 README.md               # This File
```

## 🔧 Development

### 🖥️ Backend Development (.NET)

```bash
cd Backend

# Restore packages
dotnet restore

# Update database
dotnet ef database update

# Run in development mode
dotnet run --environment Development

# Run tests
dotnet test
```

### 🎨 Frontend Development (React)

```bash
cd Frontend

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

### 🗄️ Database Management

```bash
# Create new migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update

# Drop database (⚠️ Caution)
dotnet ef database drop
```

## 🚢 Deployment

### 🌟 Production Deployment

1. **📦 Build Production Images**
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

2. **🚀 Deploy to Cloud**
   ```bash
   # Azure Container Instances
   docker-compose -f docker-compose.prod.yml up -d
   
   # AWS ECS
   # Configure AWS CLI and deploy using ECS CLI
   
   # Google Cloud Run
   # Use Cloud Build for automated deployment
   ```

3. **⚙️ Environment Variables**
   ```bash
   # Set production environment variables
   DATABASE_URL=your_production_db_url
   JWT_SECRET=your_jwt_secret
   API_URL=your_production_api_url
   ```

### 🔄 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: 🚀 Deploy to Production
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    # Add your CI/CD steps here
```

## 📊 API Documentation

### 🔗 Endpoints Overview

| Method | Endpoint | Description | 🔐 Auth |
|--------|----------|-------------|---------|
| GET | `/api/health` | Health check | ❌ |
| POST | `/api/auth/login` | User login | ❌ |
| GET | `/api/users` | Get users | ✅ |
| POST | `/api/users` | Create user | ✅ |

### 📋 Swagger Documentation

Once the application is running, visit:
- 🌐 **Local**: http://localhost:5000/swagger
- 🚀 **Production**: https://your-domain.com/swagger

## 🧪 Testing

### 🔬 Backend Tests
```bash
cd Backend
dotnet test --verbosity normal
```

### 🧪 Frontend Tests
```bash
cd Frontend
npm test -- --coverage --watchAll=false
```

### 🐳 Integration Tests
```bash
# Run full integration test suite
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 📈 Monitoring & Logging

- 📊 **Application Insights** - Performance monitoring
- 📝 **Serilog** - Structured logging
- 🏥 **Health Checks** - Service health monitoring
- 📉 **Metrics** - Custom application metrics

## 🤝 Contributing

We love contributions! 🎉

### 📋 How to Contribute

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 **Push** to the branch (`git push origin feature/AmazingFeature`)
5. 🔄 **Open** a Pull Request

### 📏 Coding Standards

- ✅ Follow .NET and React best practices
- 📝 Write meaningful commit messages
- 🧪 Include tests for new features
- 📖 Update documentation as needed

## 📞 Support & Contact

- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/your-repo/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/your-repo/discussions)
- 📧 **Email**: your-email@domain.com

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🌟 Don't forget to star this repository if it helped you! 🌟

**Made with ❤️ by [Your Name](https://github.com/yourusername)**

[![⭐ Star on GitHub](https://img.shields.io/github/stars/yourusername/your-repo?style=social)](https://github.com/yourusername/your-repo/stargazers)
[![🍴 Fork on GitHub](https://img.shields.io/github/forks/yourusername/your-repo?style=social)](https://github.com/yourusername/your-repo/network)

</div>
