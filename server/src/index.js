const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config({ path: "/app_data/.env" });
const express = require("express");
const app = express();
var PORT = process.env.SERVER_PORT;
const cors = require("cors");
const knex = require("knex")(require("../knexfile")["development"]);

app.use(cors());
app.use(express.json());

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

// Add post for members

app.post('/members', (req, res) => {
  const { name, rank } = req.body;

  if (!name || !rank) {
    return res.status(400).json({
      message: 'Missing required fields: name or rank.',
    });
  }

  knex('members')
    .insert({ name, rank })
    .returning('*')
    .then((data) => {
      res.status(201).json({
        message: 'Member added successfully!',
        member: data[0], // the new member
      });
    })
    .catch((err) => {
      console.error('Database insert error:', err);
      res.status(500).json({
        message: 'An error occurred while adding the member. Please try again later.',
      });
    });
});


// end of post for members


// put for members
app.put('/members', (req, res) => {
  const {id, name, rank } = req.body; // Get new values from request body

  // Validate the required fields
  if (!id || !name || !rank) {
    return res.status(400).json({
      message: 'Missing required fields: memberId, name, or rank.',
    });
  }

  // Update the member in the database
  knex('members')
    .where('id', id) // Find member by memberId
    .update({ name, rank }) // Update name and rank
    .returning('*') // Return the updated member data (optional)
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          message: 'Member not found',
        });
      }

      res.status(200).json({
        message: 'Member updated successfully!',
        data: data[0], // Return the updated member data
      });
    })
    .catch((err) => {
      console.error('Database update error:', err);
      res.status(500).json({
        message: 'An error occurred while updating the member. Please try again later.',
      });
    });
});
//member put end


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

app.post('/courses', (req, res) => {
  const { course_name, start_date, end_date, cert_id } = req.body;

  // Validate the input
  if (!course_name || !start_date || !end_date || !cert_id) {
    return res.status(400).json({
      message: 'Missing required fields: course_name, start_date, end_date, or cert_id.',
    });
  }

  // Insert the new course into the database
  knex('courses')
    .insert({ course_name, start_date, end_date, cert_id })
    .returning('*') // Return the inserted course
    .then((data) => {
      res.status(201).json({
        message: 'Course added successfully!',
        course: data[0], // Return the inserted course
      });
    })
    .catch((err) => {
      console.error('Database insert error:', err);
      res.status(500).json({
        message: 'An error occurred while adding the course. Please try again later.',
      });
    });
});

app.delete('/courses/:id', (req, res) => {
  const { id } = req.params;

  knex('courses')
    .where({ id })
    .del()
    .then((count) => {
      if (count === 0) {
        return res.status(404).json({
          message: `Course with id ${id} not found.`,
        });
      }
      res.status(200).json({
        message: `Course with id ${id} deleted successfully.`,
      });
    })
    .catch((err) => {
      console.error('Database delete error:', err);
      res.status(500).json({
        message: 'An error occurred while deleting the course. Please try again later.',
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
    .join('certifications', 'intermediate.cert_id', '=', 'certifications.id')
    .select('courses.id as course_id', 'certifications.id as c_id', 'courses.cert_id', 'course_name', 'start_date', 'end_date', 'position')
    .orderBy('position')
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
