
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

// router.post('/specificAssignment', (req, res) => {
//     const sql = 'INSERT into AssignedToStudent (qid, sid, viewable) VALUES (?, ?, ?)';
//     db.query(sql, [qid, sid, viewable], (err, results) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.json({ message: 'Student assigned specific question'});
//     });
// });

router.post('/assignQuestion', (req, res) => {
  const { qid, courses, students, viewable } = req.body;
  console.log(qid)
  console.log(courses)
  console.log(students)
  console.log(viewable)
  if (courses.length > 0) {
      courses.forEach((cid) => {
          const sqlClass = 'INSERT INTO AssignedToClass (qid, cid, viewable) VALUES (?, ?, ?)';
          db.query(sqlClass, [qid, cid, viewable], (err) => {
              if (err) console.error("Error assigning to class:", err);
          });
      });
  }

  if (students.length > 0) {
      students.forEach((sid) => {
          const sqlStudent = 'INSERT INTO AssignedToStudent (qid, sid, viewable) VALUES (?, ?, ?)';
          db.query(sqlStudent, [qid, sid, viewable], (err) => {
              if (err) console.error("Error assigning to student:", err);
          });
      });
  }

  res.json({ message: "Question assigned successfully" });
});


// const assignToClass = async (cid, qid, viewable) => {
//   console.log("in assign to class")
//   return new Promise((resolve, reject) => {
//       const sqlClass = 'INSERT INTO AssignedToClass (qid, cid, viewable) VALUES (?, ?, ?)';
//       db.query(sqlClass, [qid, cid, viewable], (err, result) => {
//           if (err) {
//               reject(err);  // reject on error
//           } else {
//               resolve(result);  // resolve on success
//           }
//       });
//   });
// };

// const assignToStudent = async (sid, qid, viewable) => {
//   return new Promise((resolve, reject) => {
//       const sqlStudent = 'INSERT INTO AssignedToStudent (sid, qid, viewable) VALUES (?, ?, ?)';
//       db.query(sqlStudent, [qid, sid, viewable], (err, result) => {
//           if (err) {
//               reject(err);  // reject on error
//           } else {
//               resolve(result);  // resolve on success
//           }
//       });
//   });
// };

// router.post('/assignQuestion', async (req, res) => {
//   const { qid, courses, students, viewable } = req.body;

//   try {
//       const classPromises = courses.map(cid => assignToClass(cid, qid, viewable)); // map to promises
//       const studentPromises = students.map(sid => assignToStudent(sid, qid, viewable)); // map to promises

//       // Wait for all promises to resolve
//       await Promise.all([...classPromises, ...studentPromises]);

//       res.json({ message: "Question assigned successfully" });
//   } catch (error) {
//       console.error("Error assigning question:", error);
//       res.status(500).json({ error: "An error occurred while assigning the question" });
//   }
// });

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
  const sql = 'SELECT DISTINCT q.qid, q.question, q.description, q.pointVal, q.imgfile, q.topic, q.type, q.dueDate, atc.viewable as classView ' +
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
  const sql = 'SELECT q.qid, q.question, q.description, q.pointVal, q.imgfile, q.topic, q.type, q.dueDate ' +
    'From Questions q Where tid = ?';
  db.query(sql, [tid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
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
  const sql = 'Select distinct u.userID, u.fname, u.lname From Users u join Enrolled e on u.UserID = e.sid where e.tid = ?';
  db.query(sql, [tid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({results});
  });
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
