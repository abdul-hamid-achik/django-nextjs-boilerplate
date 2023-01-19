# README.md

I made this project template to make it easy to quickly bootstrap full stack application following modern practices.

## Features
- Full stack development with Django and Next.js
- Authentication with next-auth.js and Django REST framework simplejwt
- Docker-compose for easy setup and deployment
- Automatic API documentation generation with a `/docs` endpoint and exportable `/schema` file
- openapi 3 typesafe generated axios client in `./client` by running the command `npm run generate-client`
- Easy management with the `task` command (see available tasks by running `task --list` after installing [task](https://taskfile.dev))
- Use .env files for local development
- Github Actions workflows for CI/CD

## Project Structure
The project is structured with two separate images for the frontend and backend. The backend, which is built using Django REST framework, is located in the `./backend` directory, where you can find the api, settings, shared, urls and wsgi files. The frontend, which is built using Next.js, is located in the `./frontend` directory, where you can find the pages, styles, and server files.

see `tree -L 3 -I 'node_modules|.venv|client|__pycache__'` for a more detailed view of the project structure.

Additionally, the project includes:
- `pyproject.toml` in `./backend` for managing python dependencies using [pdm](pdm.fming.dev)
- `package.json` in `./frontend` for managing frontend dependencies using [npm](https://www.npmjs.com/)
- `Taskfile.yml` for easy task running using [task](https://taskfile.dev)
- `docker-compose.yml` that contains the necessary stuff to run the project

## Requirements
- Docker and Docker Compose
- Node.js and npm optionally
- Python 3.11 and pdm optionally
- [asdf](https://asdf-vm.com) optionally
## Getting Started

### Setup with Docker
1. Clone the repository: `git clone https://github.com/sicksid/django-nextjs-project-template.git`
2. Rename the project with your desired name: `mv django-nextjs-project-template yourprojectname` and `cd yourprojectname`
3. Build and start the containers: `docker compose up --build`
4. The application should now be running at `http://localhost:3000` for the frontend and `http://localhost:8080` for the backend

### Setup locally
1. Clone the repository: `git clone https://github.com/sicksid/django-nextjs-project-template.git`
2. Rename the project with your desired name: `mv django-nextjs-project-template yourprojectname` and `cd yourprojectname`
3. start the database in the background, example: `docker compose up -d database`
4. Install the python dependencies: `cd backend && pdm install`
5. Install the frontend dependencies: `cd frontend && npm install`
6. The application should now be running at `http://localhost:3000` for the frontend and `http://localhost:8080` for the backend

