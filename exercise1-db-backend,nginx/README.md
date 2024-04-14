Exercise 1: Backend, DB

Objective: Create a Docker Compose configuration to run a simple Node.js service, PostgreSQL. The Node.js service will interact with the PostgreSQL database and will serve the web application.

Create all files required for the exercise:

1. Create a new directory for the exercise: `mkdir docker-compose-exercise`
2. Navigate to the project directory: `cd docker-compose-exercise`
3. Set up the Node.js application by Creating a new file named `app.js` in the project directory(Content supplied below)
4. Configure the Dockerfile for the Node.js service
   1. Step 1: Open a text editor and create a new file.
   2. Start by specifying the base image as the official Node.js runtime with version 14.
   3. Set the working directory inside the container to "/app".
   4. Copy the package.json file from the local directory to the container.
   5. Install the Node.js dependencies inside the container using npm install.
   6. Copy the remaining application code from the local directory to the container(app.js).
   7. Expose port 3000, which is the port the application will listen on.
   8. Set the command to run the application using npm start.

File:package.json

```
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "A simple Express app that connects to PostgreSQL",
  "dependencies": {
    "express": "^4.17.1",
    "pg": "^8.6.0"
  },
  "scripts": {
    "start": "node app.js"
  }
}
```

File:app.js

```javascript
const express = require("express");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
  user: "postgres",
  host: "postgres",
  database: "mydb",
  password: "example",
  port: 5432,
});

app.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Error executing query");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

Instructions for the docker-compose.yml file:

1. Create a new file named docker-compose.yml.
2. Open the docker-compose.yml file in a text editor.
3. Specify the version for the docker-compose.yml file.
4. Define the services section.
5. Add the first service named nodejs.
6. Specify the build options for the nodejs service.
7. Set the restart policy for the nodejs service("always")
8. Define the ports to be exposed for the nodejs service.
9. Specify the dependency on the postgres service.
10. Add a new service named postgres.
11. Specify the image for the postgres service.
12. Set the restart policy for the postgres service.
13. Define the environment variables for the postgres service.
14. Define the volumes for the postgres service.

Test you application:

1. Open a terminal and navigate to the project directory (`docker-compose-exercise`).
   1. Run the following command to start the services:
   ```bash
    docker-compose up
   ```
   2. Wait for the containers to start and verify that there are no errors.
   3. Open a web browser and visit `http://localhost:3000`. You should see the JSON response from the Node.js application containing the data retrieved from the PostgreSQL database.
