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


// POST new members

app.post('/members', (req, res) => {
  const { name, rank } = req.body;

  if (!name || !rank) {
    return res.status(400).json({
      message: 'Both name and rank are required.',
    });
  }

  // Insert the new member without including the 'id' field
  knex('members')
    .insert({ name, rank })
    .returning('*')
    .then((data) => {
      res.status(201).json({
        message: 'Member added successfully!',
        data: data[0],
      });
    })
    .catch((err) => {
      console.error('Error inserting member:', err);
      res.status(500).json({
        message: 'An error occurred while adding the member. Please try again later.',
      });
    });
});


// end of POST new members


// PUT new members
app.put('/members', (req, res) => {
  const {id, name, rank } = req.body;

  // Validate the required fields
  if (!id || !name || !rank) {
    return res.status(400).json({
      message: 'Missing required fields: memberId, name, or rank.',
    });
  }

  // Update the member in the database
  knex('members')
    .where('id', id)
    .update({ name, rank })
    .returning('*')
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          message: 'Member not found',
        });
      }

      res.status(200).json({
        message: 'Member updated successfully!',
        data: data[0],
      });
    })
    .catch((err) => {
      console.error('Database update error:', err);
      res.status(500).json({
        message: 'An error occurred while updating the member. Please try again later.',
      });
    });
});
//END of PUT new Members

// DELETE member
app.delete('/members/:id', (req, res) => {
  const { id } = req.params;

  knex('members')
    .where({ id })
    .del()
    .then((count) => {
      if (count === 0) {
        return res.status(404).json({
          message: `Member with id ${id} not found.`,
        });
      }
      res.status(200).json({
        message: `Member with id ${id} deleted successfully.`,
      });
    })
    .catch((err) => {
      console.error('Database delete error:', err);
      res.status(500).json({
        message: 'An error occurred while deleting the member. Please try again later.',
      });
    });
});

// END DELETE member


// Helper function to format dates as "yyyy-MM-dd" using local time
const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

app.get('/courses', (req, res) => {
    knex('courses')
        .select('*')
        .then((courses) => {
            const formattedCourses = courses.map((course) => ({
                ...course,
                start_date: formatDate(new Date(course.start_date)),
                end_date: formatDate(new Date(course.end_date)),
            }));
            res.status(200).json(formattedCourses);
        })
        .catch((err) => {
            console.error("Database query error:", err);
            res.status(500).json({
                message: 'An error occurred while fetching courses.',
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
    .returning('*')
    .then((data) => {
      res.status(201).json({
        message: 'Course added successfully!',
        course: data[0],
      });
    })
    .catch((err) => {
      console.error('Database insert error:', err);
      res.status(500).json({
        message: 'An error occurred while adding the course. Please try again later.',
      });
    });
});

app.patch('/courses/:id', (req, res) => {
  const { id } = req.params;
  const { course_name, start_date, end_date, cert_id } = req.body;

  if (!course_name && !start_date && !end_date && !cert_id) {
    return res.status(400).json({
      message: 'At least one field is empty and is needed for an update',
    });
  }

  const updateData = {};
  if (course_name) updateData.course_name = course_name;
  if (start_date) updateData.start_date = start_date;
  if (end_date) updateData.end_date = end_date;
  if (cert_id) updateData.cert_id = cert_id;

  knex('courses')
    .where({ id })
    .update(updateData)
    .returning('*')
    .then((updatedCourse) => {
      if (updatedCourse.length === 0) {
        return res.status(404).json({
          message: `Course with id ${id} not found.`,
        });
      }
      res.status(200).json({
        message: `${course_name} with id ${id} updated successfully.`,
        course: updatedCourse[0],
      });
    })
    .catch((err) => {
      console.error('Database update error:', err);
      res.status(500).json({
        message: 'An error occurred while updating the course. Please try again.',
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
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error("Database query error:", err);
      res.status(500).json({
        message: 'An error occurred while fetching data. Please try again later.',
      });
    });
});

app.get('/courses/members', (req, res) => {
  knex('courses')
    .leftJoin('intermediate', 'courses.id', '=', 'intermediate.course_id')
    .leftJoin('members', 'intermediate.member_id', '=', 'members.id')
    .leftJoin('certifications', 'intermediate.cert_id', '=', 'certifications.id')
    .select(
      'courses.id as course_id',
      'courses.course_name',
      'courses.start_date',
      'courses.end_date',
      'certifications.position as certification_position',
      'members.name as member_name',
      'members.rank as member_rank'
    )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error("Database query error:", err);
      res.status(500).json({
        message: 'An error occurred while fetching data.',
      });
    });
});

app.get('/courses/certs', (req, res) => {
  knex('courses')
    .leftJoin('intermediate', 'courses.id', '=', 'intermediate.course_id')
    .leftJoin('certifications', 'intermediate.cert_id', '=', 'certifications.id')
    .select(
      'courses.id as course_id',
      'courses.cert_id',
      'certifications.id as c_id',
      'certifications.position'
    )
    .then((data) => {
      console.log("Data returned by /courses/certs:", data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error("Database query error:", err);
      res.status(500).json({
        message: 'An error occurred while fetching certifications.',
      });
    });
});

app.get('/all', (req, res) => {
  knex('members')
    .join('intermediate', 'members.id', '=', 'intermediate.member_id')
    .join('certifications', 'intermediate.cert_id', '=', 'certifications.id')
    .join('crews', 'intermediate.member_id', '=', 'crews.member_id')
    .select('*')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error("Database query error:", err);
      res.status(500).json({
        message: 'An error occurred while fetching data. Please try again later.',
      });
    });
});

app.post('/assign-member', (req, res) => {
  const { course_id, member_id, cert_id } = req.body;
  if (!course_id || !member_id || !cert_id) {
    return res.status(400).json({
      message: 'Missing required fields: course_id, member_id, or cert_id.',
    });
  }
  knex('intermediate')
    .insert({ course_id, member_id, cert_id })
    .onConflict(['course_id', 'cert_id'])
    .merge({ member_id })
    .then(() => {
      res.status(200).json({
        message: 'Member assigned to course successfully!',
      });
    })
    .catch((err) => {
      console.error('Database error:', err);
      res.status(500).json({
        message: 'An error occurred while assigning the member to the course.',
      });
    });
});

app.get('/certifications', (req, res) => {
  knex('certifications')
    .select('id', 'position')
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.error('Error fetching certifications:', err);
      res.status(500).json({ message: 'Failed to fetch certifications.' });
    });
});

const server = app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = { app, server, PORT };
