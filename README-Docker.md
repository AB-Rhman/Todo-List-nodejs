# Docker Setup for Todo App

This document explains how to run the Todo application using Docker and Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/AB-Rhman/Todo-List-nodejs.git
   cd FortStak
   ```

2. **Run with Docker Compose**:
   ```bash
   docker-compose up -d
   ```

3. **Access the application**:
   - Open your browser and go to: `http://localhost:4000`
   - The MongoDB database will be available on port `27017`

## Docker Services

### MongoDB Database
- **Container**: `todo_mongodb`
- **Port**: `27017`
- **Credentials**: 
  - Username: `root`
  - Password: `example`
  - Database: `todo_db`

### Todo Application
- **Container**: `todo_app`
- **Port**: `4000`
- **Health Check**: Available at `http://localhost:4000`

## Useful Commands

### Start services
```bash
docker-compose up -d
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f todo-app
docker-compose logs -f mongodb
```

### Stop services
```bash
docker-compose down
```

### Stop and remove volumes (WARNING: This will delete all data)
```bash
docker-compose down -v
```

### Rebuild and restart
```bash
docker-compose up -d --build
```

### Check service status
```bash
docker-compose ps
```

## Environment Variables

The application uses the following environment variables:

- `mongoDbUrl`: MongoDB connection string
- `NODE_ENV`: Node.js environment (development/production)
- `PORT`: Application port (default: 4000)

These are automatically set in the Docker Compose configuration.

## Data Persistence

- MongoDB data is persisted in a Docker volume named `mongodb_data`
- Application uploads (if any) are mounted to `./uploads` directory

## Troubleshooting

### If the app can't connect to MongoDB:
1. Check if MongoDB container is running: `docker-compose ps`
2. Check MongoDB logs: `docker-compose logs mongodb`
3. Ensure the connection string in docker-compose.yml is correct

### If the app won't start:
1. Check app logs: `docker-compose logs todo-app`
2. Ensure all dependencies are properly installed
3. Check if port 4000 is available on your system

### To reset everything:
```bash
docker-compose down -v
docker system prune -f
docker-compose up -d --build
```

## Development

For local development without Docker:
1. Copy `env.example` to `.env`
2. Install dependencies: `npm install`
3. Start MongoDB locally or use the Docker MongoDB service
4. Run the app: `npm start` 