const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config({ path: "/app_data/.env" });
const express = require("express");
const app = express();
var PORT = process.env.SERVER_PORT;
const cors = require("cors");
const knex = require("knex")(require("../knexfile")["development"]);

app.use(cors());

if (!PORT) {
	dotenv.config({ path: path.resolve(__dirname, "../.env") });
	PORT = process.env.SERVER_PORT;
}

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get('/members', (req, res) => {
  knex('members')
    .select('*')
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.error("Database query error:", err);
      res.status(500).json({
        message: 'An error occurred while fetching data. Please try again later.'
      });
    });
});

app.get('/courses', (req, res) => {
  knex('courses')
    .select('*')
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.error("Database query error:", err);
      res.status(500).json({
        message: 'An error occurred while fetching data. Please try again later.'
      });
    });
});

app.get('/members/courses', (req, res) => {
  knex('members')
		.join('intermediate', 'members.id', '=', 'member_id')
		.join('courses', 'course_id', '=', 'courses.id')
    .select('*')
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.error("Database query error:", err);
      res.status(500).json({
        message: 'An error occurred while fetching data. Please try again later.'
      });
    });
});

app.get('/courses/certs', (req, res) => {
  knex('courses')
		.join('intermediate', 'courses.id', '=', 'intermediate.course_id')
		.join('certifications', 'intermediate.cert_id','=' , 'certifications.id')
    .select('*')
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.error("Database query error:", err);
      res.status(500).json({
        message: 'An error occurred while fetching data. Please try again later.'
      });
    });
});

app.get('/all', (req, res) => {
  knex('members')
		.join('intermediate', 'members.id', '=', 'intermediate.member_id')
		.join('certifications', 'intermediate.cert_id','=' , 'certifications.id')
		.join('crews', 'intermediate.member_id', '=', 'crews.member_id')
    .select('*')
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.error("Database query error:", err);
      res.status(500).json({
        message: 'An error occurred while fetching data. Please try again later.'
      });
    });
});
const server = app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = { app, server, PORT };
