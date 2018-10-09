# rangle-labs

This is a MERN stack (MongoDB, Express, React, Node) web app to keep track of all interal projects and free agents. It is made of of listings (of projects and agents, primarily) and detail pages (of projects and agents too). Users can add projects, agents, and technologies.

## Getting Started with this Project:

1. Git clone this thing so that you have it locally.

2. In your terminal, cd into the project root folder and run:

```
npm install
```

3. Install MongoDB if you don't already have it (https://docs.mongodb.com/manual/administration/install-community/).

4. In your terminal, cd into the project root folder and start MongoDB by running this command:

```
mongod
```

5. Rename `.env-sample` to `.env`

6. This project uses seeds to supply dummy data so that you have something to work with while you're developing. You need to run a command in your terminal to populate the seed data in MongoDB. In the terminal, in the root of your project, run:

```
npm run seeds
```

7. In order to login, you'll need to add a Google Auth2.0 Client Id and Secret to `.env`. Speak to the project owner to get hold of these.

Okay, now you should be all set up and ready to go!

## Running the Project During Development:

1.  Open a terminal window, navigate into the root folder of the project, and run:

```
mongod
```

This will start the MongoDB database so that you can access the project data.

2.  Open a second terminal window, navigate into the root folder of the project, and run:

```
npm start
```

This will start your project and open it in a browser tab.

## Migrations

1. `./node_modules/db-migrate/bin/db-migrate create [name]` to create new migration scripts with name `name`
**Note:** When creating a migration scripts, don't forget to add MongoDB Collections backups (`mongodump`) before deleting collections and collection restores (`mongorestore`) while creating Collections

2. `./node_modules/db-migrate/bin/db-migrate up` to execute the migration scripts and bring database up to the latest version

3. `./node_modules/db-migrate/bin/db-migrate down` to rollback to the previous database version. (`--count NUM` for `NUM` down migrations)

## Acknowledgements

This project used https://github.com/swbloom/react-express-boilerplate as a starting point.
