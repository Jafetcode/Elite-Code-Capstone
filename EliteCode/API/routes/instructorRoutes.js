
const express = require('express');
const router = express.Router();
const db = require('../db');

// Define your routes
router.get('/', (req, res) => {
  res.send('Instructor route');
});

router.post('/createCourse', (req, res) => {
  const { tid } = req.query;
  const { courseName, description } = req.body;
  if (!courseName || !tid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = 'INSERT INTO Classes (courseName, tid, description) VALUES (?, ?, ?)';
  db.query(sql, [courseName, tid, description], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Course created', courseId: results.insertId });
  });
})


router.get('/getCourses', (req, res) => {
  console.log("in get courses")
  const { tid } = req.query;
  const sql = 'SELECT * FROM Classes WHERE tid = ?';

  db.query(sql, [tid], (err, results) =>{
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


router.post('/assignQuestion', (req, res) => { 
  const { qid, courses, students, viewable, tid } = req.body;
  if (courses.length > 0) {
    console.log("assigned to at least one course")
      courses.forEach((cid) => {
          const sqlClass = 'INSERT INTO AssignedToClass (qid, cid, tid, viewable) VALUES (?, ?, ?, ?)';
          db.query(sqlClass, [qid, cid, tid, viewable], (err) => {
              if (err) console.error("Error assigning to class:", err);
          });
      });
  }
  if (students.length > 0) {
    console.log("assigned to at least one student")
      students.forEach((sid) => {
          const sqlStudent = 'INSERT INTO AssignedToStudent (qid, sid, viewable) VALUES (?, ?, ?)';
          db.query(sqlStudent, [qid, sid, viewable], (err) => {
              if (err) console.error("Error assigning to student:", err);
          });
      });
  }

  res.json({ message: "Question assigned successfully" });
});

router.get('/submission', (req, res) => {
  const sid = req.query.sid;
  const qid = req.query.qid;
  const sql = 'Select * from Submissions where qid= ? and sid = ?';
  db.query(sql, [qid, sid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({results});
  });
});

router.put('/gradeSubmission',( req, res) => {
  const sql = 'UPDATE Submissions set grade= ?, comment = ? where qid = ? and sid = ?';
  db.query(sql, [grade, comment, qid, sid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({message: "Submission graded successfully", results});
  });

});


router.get('/questions', (req, res) => {
  const cid = req.query.cid;
  const sql = 'SELECT DISTINCT q.qid, q.question, q.description, q.pointVal, q.imgFile, q.topic, q.type, q.dueDate, atc.viewable as classView ' +
    'From Questions q RIGHT JOIN AssignedToClass atc on q.qid = atc.qid Where cid = ?';
  db.query(sql, [cid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
  
});

router.get('/allQuestions', (req, res) => {
  const tid = req.query.tid;
  const sql = 'SELECT q.qid, q.question, q.description, q.pointVal, q.imgFile, q.topic, q.type, q.dueDate ' +
    'From Questions q Where tid = ?';
  db.query(sql, [tid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("all questions")
    res.json({ results });

  });
});


router.get('/getQuestion', (req, res) => {
  const qid = req.query.qid;
  const sql = 'SELECT * FROM Questions Where qid = ?';
  db.query(sql, [qid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});


router.get('/questionID', (req, res) => {
  const cid = req.query.cid;
  const sql = 'SELECT qid FROM Questions WHERE cid = ?';
  db.query(sql, [cid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});

router.get('/classlist', (req, res) => { //working
  const cid = req.query.cid;
  const sql = 'Select Users.userID, Users.fname, Users.lname, Users.email '
  + 'From Users join Enrolled where Enrolled.cid = ? and Enrolled.sid = Users.userID';
  db.query(sql, [cid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({results});
  });
});

router.delete('/removeStudent', (req, res) =>{
  const { cid, sid } = req.query;
  const sql = 'DELETE FROM Enrolled WHERE cid = ? AND sid = ?';
  db.query(sql, [cid, sid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Student removed from course'});
  });
});

router.get('/courses', (req, res) => { //working
  const tid = req.query.tid;
  const sql = 'Select Classes.cid, Classes.courseName, Classes.description, coalesce(count(distinct Enrolled.sid), 0) as NumEnrolled ' +
  'FROM Classes left join Enrolled on Classes.cid = Enrolled.cid ' +
  'where  Classes.tid = ? ' +
  'GROUP BY Classes.cid, Classes.courseName';
  db.query(sql, [tid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({results});
  });
});
router.get('/students', (req, res) => { //working
  const tid = req.query.tid;
  const sql = 'Select e.cid, distinct u.userID, u.fname, u.lname From Users u join Enrolled e on u.UserID = e.sid where e.tid = ? and e.sid = u.UserID';
  db.query(sql, [tid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({results});
  });
});

router.get('/:tid/courses', async (req, res) => {
  const { tid } = req.params.tid;
  console.log(`tid : ${tid}`);
  const sql = `
    SELECT e.cid, c.courseName, u.userID, u.fname, u.lname
    FROM Enrolled e
    JOIN Users u ON e.sid = u.userID
    JOIN Classes c ON e.cid = c.cid
    WHERE e.tid = ?
    ORDER BY c.courseName, u.lname, u.fname`;

  try {
    const [rows] = db.query(sql, [tid]);

    // Group rows by course
    const courses = {};
    rows.forEach(row => {
      if (!courses[row.cid]) {
        courses[row.cid] = {
          cid: row.cid,
          courseName: row.courseName,
          students: [],
        };
      }
      courses[row.cid].students.push({
        userID: row.userID,
        fname: row.fname,
        lname: row.lname,
      });
    });

    res.json(Object.values(courses));
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});


router.put('/updateQuestion', (req, res) => {
  const sql = ' ';
  db.query(sql, [], (err, results) => {
    if(err) {
      return res.status(500).json({error: err.message});
    }
    res.json({results})
  })
})
// Export the router
module.exports = router;
