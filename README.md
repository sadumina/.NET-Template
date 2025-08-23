# 🏗️ Complete .NET + React + Docker Setup Guide

## 📋 Prerequisites

Before starting, make sure you have these installed:

```bash
# Check if you have these tools installed
dotnet --version    # Should be 6.0 or higher
node --version      # Should be 16.0 or higher  
npm --version       # Should be 8.0 or higher
docker --version    # Should be 20.0 or higher
```

If you don't have them, download from:
- 🔷 [.NET SDK](https://dotnet.microsoft.com/download)
- 📦 [Node.js](https://nodejs.org/)
- 🐳 [Docker Desktop](https://www.docker.com/products/docker-desktop)

## 🚀 Step 1: Create Project Structure

### 1️⃣ Create Root Directory and Navigate

```bash
# Create main project folder
mkdir MyFullStackApp
cd MyFullStackApp

# Initialize git repository (optional)
git init
```

### 2️⃣ Create Backend (.NET Web API)

```bash
# Create backend folder and navigate
mkdir Backend
cd Backend

# Create .NET Web API project
dotnet new webapi -n MyApp.API
cd MyApp.API

# Add necessary packages
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Microsoft.AspNetCore.Cors
dotnet add package Swashbuckle.AspNetCore

# Build to verify everything is working
dotnet build
```

### 3️⃣ Create Frontend (React)

```bash
# Go back to root directory
cd ../../

# Create React app
npx create-react-app Frontend --template typescript
cd Frontend

# Add additional packages for API communication
npm install axios react-router-dom @types/node
npm install -D @types/react-router-dom

# Verify React app works
npm start
```

## 📁 Step 2: Final Project Structure

After completing Step 1, your folder structure should look like this:

```
📦 MyFullStackApp/
├── 📁 Backend/
│   └── 📁 MyApp.API/
│       ├── 📁 Controllers/
│       │   └── 📄 WeatherForecastController.cs
│       ├── 📁 Models/
│       │   └── 📄 WeatherForecast.cs
│       ├── 📁 Properties/
│       │   └── 📄 launchSettings.json
│       ├── 📄 Program.cs
│       ├── 📄 MyApp.API.csproj
│       └── 📄 appsettings.json
├── 📁 Frontend/
│   ├── 📁 public/
│   │   ├── 📄 index.html
│   │   └── 📄 favicon.ico
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   ├── 📁 pages/
│   │   ├── 📁 services/
│   │   ├── 📄 App.tsx
│   │   ├── 📄 App.css
│   │   └── 📄 index.tsx
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
├── 📄 docker-compose.yml
├── 📄 .gitignore
└── 📄 README.md
```

## ⚙️ Step 3: Configure Backend (.NET API)

### 1️⃣ Update Program.cs

Navigate to `Backend/MyApp.API/Program.cs` and replace with:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();
```

### 2️⃣ Create a Simple API Controller

Create `Backend/MyApp.API/Controllers/UsersController.cs`:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<object>> GetUsers()
    {
        var users = new[]
        {
            new { Id = 1, Name = "John Doe", Email = "john@example.com" },
            new { Id = 2, Name = "Jane Smith", Email = "jane@example.com" },
            new { Id = 3, Name = "Bob Johnson", Email = "bob@example.com" }
        };
        
        return Ok(users);
    }

    [HttpGet("{id}")]
    public ActionResult<object> GetUser(int id)
    {
        var user = new { Id = id, Name = $"User {id}", Email = $"user{id}@example.com" };
        return Ok(user);
    }
}
```

### 3️⃣ Update appsettings.json

Update `Backend/MyApp.API/appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=MyAppDb;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

## 🎨 Step 4: Configure Frontend (React)

### 1️⃣ Create API Service

Create `Frontend/src/services/apiService.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:7076/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface User {
  id: number;
  name: string;
  email: string;
}

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  getUser: async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },
};
```

### 2️⃣ Create Components

Create `Frontend/src/components/UserList.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
import { userService, User } from '../services/apiService';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await userService.getUsers();
        setUsers(userData);
      } catch (err) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      <div style={{ display: 'grid', gap: '10px' }}>
        {users.map((user) => (
          <div key={user.id} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>ID: {user.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
```

### 3️⃣ Update App.tsx

Replace `Frontend/src/App.tsx` with:

```typescript
import React from 'react';
import './App.css';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 My Full Stack App</h1>
        <p>React Frontend + .NET Backend</p>
        <UserList />
      </header>
    </div>
  );
}

export default App;
```

### 4️⃣ Add Environment Variable

Create `Frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5076/api
```

## 🐳 Step 5: Docker Configuration

### 1️⃣ Create Backend Dockerfile

Create `Backend/MyApp.API/Dockerfile`:

```dockerfile
# Use the official .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy project file and restore dependencies
COPY *.csproj .
RUN dotnet restore

# Copy source code and build
COPY . .
RUN dotnet publish -c Release -o out

# Use the ASP.NET runtime image for running
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Expose port
EXPOSE 80
EXPOSE 443

ENTRYPOINT ["dotnet", "MyApp.API.dll"]
```

### 2️⃣ Create Frontend Dockerfile

Create `Frontend/Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3️⃣ Create Nginx Configuration

Create `Frontend/nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend:80/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 4️⃣ Create Docker Compose

Create `docker-compose.yml` in the root directory:

```yaml
version: '3.8'

services:
  # SQL Server Database
  database:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: myapp-database
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourStrong@Passw0rd
      - MSSQL_PID=Developer
    ports:
      - "1433:1433"
    volumes:
      - sql_server_data:/var/opt/mssql
    networks:
      - myapp-network

  # .NET Backend API
  backend:
    build:
      context: ./Backend/MyApp.API
      dockerfile: Dockerfile
    container_name: myapp-backend
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=http://+:80
      - ConnectionStrings__DefaultConnection=Server=database,1433;Database=MyAppDb;User=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=true
    ports:
      - "5076:80"
    depends_on:
      - database
    networks:
      - myapp-network

  # React Frontend
  frontend:
    build:
      context: ./Frontend
      dockerfile: Dockerfile
    container_name: myapp-frontend
    environment:
      - REACT_APP_API_URL=http://localhost:5076/api
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - myapp-network

networks:
  myapp-network:
    driver: bridge

volumes:
  sql_server_data:
```

### 5️⃣ Create .gitignore

Create `.gitignore` in root directory:

```gitignore
# .NET
bin/
obj/
*.user
*.suo
*.cache
*.dll
*.pdb
*.exe

# React
node_modules/
build/
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Docker
.dockerignore

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
```

## 🚀 Step 6: Run Your Application

### 🏃‍♂️ Method 1: Run with Docker (Recommended)

```bash
# From the root directory (MyFullStackApp)
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### 🏃‍♂️ Method 2: Run Manually (Development)

**Terminal 1 - Backend:**
```bash
cd Backend/MyApp.API
dotnet run
# Backend will run on https://localhost:7076
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm start
# Frontend will run on http://localhost:3000
```

## 🌐 Access Your Application

After running with Docker:
- 🎨 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:5076
- 📊 **Swagger UI**: http://localhost:5076/swagger
- 🗄️ **Database**: localhost:1433 (user: sa, password: YourStrong@Passw0rd)

## ✅ Verify Everything Works

1. **Backend Test**: Visit http://localhost:5076/swagger
2. **API Test**: Visit http://localhost:5076/api/users
3. **Frontend Test**: Visit http://localhost:3000 - you should see the user list
4. **Full Integration**: The React app should display users fetched from the .NET API

## 🎉 You're Done!

You now have:
- ✅ A .NET Web API backend with Swagger documentation
- ✅ A React TypeScript frontend
- ✅ SQL Server database
- ✅ Complete Docker containerization
- ✅ CORS configured for communication between frontend and backend
- ✅ A working full-stack application!

## 🔧 Next Steps

1. **Add Authentication**: Implement JWT authentication
2. **Add Entity Framework**: Create proper models and database context
3. **Add Validation**: Input validation and error handling
4. **Add Testing**: Unit tests for both frontend and backend
5. **Add CI/CD**: GitHub Actions for automated deployment

## 🚨 Common Issues & Solutions

**Port Conflicts**: If ports are already in use, change them in docker-compose.yml
**CORS Issues**: Make sure the frontend URL is added to CORS policy in Program.cs
**Database Connection**: Wait for SQL Server to fully start before the backend connects
**Docker Build Fails**: Make sure Docker Desktop is running and you have enough disk space
