
const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

  const checkDuplicate = 'SELECT * FROM Classes WHERE tid = ? AND courseName = ?';
  db.query(checkDuplicate, [tid, courseName], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'You Cannot Have A Duplicate Course Name' });
    }

    const sql = 'INSERT INTO Classes (courseName, tid, description) VALUES (?, ?, ?)';
    db.query(sql, [courseName, tid, description], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Course created!', courseId: results.insertId });
    });
  });
});



router.get('/getCourses', (req, res) => {
  const { tid } = req.query;
  const sql = 'SELECT * FROM Classes WHERE tid = ?';

  db.query(sql, [tid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.post('/updateAssignments', (req, res) => {
  const { qid, courses = [], students = [], tid } = req.body;

  const fetchClassAssignments = 'SELECT cid FROM AssignedToClass WHERE qid = ?';
  db.query(fetchClassAssignments, [qid], (err, classResults) => {
    if (err) return res.status(500).json({ message: "Error fetching class assignments" });

    const existingCids = classResults.map(r => r.cid);
    const cidsToDelete = existingCids.filter(cid => !courses.includes(cid));
    const cidsToInsert = courses.filter(cid => !existingCids.includes(cid));

    const classDeletePromises = cidsToDelete.map(cid =>
      new Promise((resolve, reject) =>
        db.query('DELETE FROM AssignedToClass WHERE qid = ? AND cid = ? AND tid = ?', [qid, cid, tid], (err) =>
          err ? reject(err) : resolve()
        )
      )
    );

    const classInsertPromises = cidsToInsert.map(cid =>
      new Promise((resolve, reject) =>
        db.query('INSERT INTO AssignedToClass (qid, cid, tid) VALUES (?, ?, ?)', [qid, cid, tid], (err) =>
          err ? reject(err) : resolve()
        )
      )
    );

    const fetchStudentsInClasses = 'SELECT sid FROM Enrolled WHERE cid IN (?)';
    const courseIdsToCheck = courses.length > 0 ? courses : [-1];
    db.query(fetchStudentsInClasses, [courseIdsToCheck], (err, classStudentResults) => {
      if (err) return res.status(500).json({ message: "Error fetching students in selected classes" });

      const studentsInClasses = classStudentResults.map(r => r.sid);
      const filteredStudents = students.filter(sid => !studentsInClasses.includes(sid));

      db.query('SELECT sid FROM AssignedToStudent WHERE qid = ?', [qid], (err, studentResults) => {
        if (err) return res.status(500).json({ message: "Error fetching student assignments" });

        const existingSids = studentResults.map(r => r.sid);
        const sidsToDelete = existingSids.filter(sid => !filteredStudents.includes(sid));
        const sidsToInsert = filteredStudents.filter(sid => !existingSids.includes(sid));

        const studentDeletePromises = sidsToDelete.map(sid =>
          new Promise((resolve, reject) =>
            db.query('DELETE FROM AssignedToStudent WHERE qid = ? AND sid = ?', [qid, sid], (err) =>
              err ? reject(err) : resolve()
            )
          )
        );

        const studentInsertPromises = sidsToInsert.map(sid =>
          new Promise((resolve, reject) =>
            db.query('INSERT INTO AssignedToStudent (qid, sid) VALUES (?, ?)', [qid, sid], (err) =>
              err ? reject(err) : resolve()
            )
          )
        );
        if (
          cidsToDelete.length === 0 &&
          cidsToInsert.length === 0 &&
          sidsToDelete.length === 0 &&
          sidsToInsert.length === 0
        ) {
          return res.json({ message: "No changes made" });
        }

        Promise.all([
          ...classDeletePromises,
          ...classInsertPromises,
          ...studentDeletePromises,
          ...studentInsertPromises
        ])
          .then(() => {
            const noChanges = cidsToDelete.length === 0 && cidsToInsert.length === 0 &&
              sidsToDelete.length === 0 && sidsToInsert.length === 0;
            return res.json({ message: noChanges ? "No changes made" : "Question assigned successfully." });
          })
          .catch(error => {
            console.error("Error updating assignments:", error);
            res.status(500).json({ message: "Error updating assignments" });
          });
      });
    });
  });
});


router.get('/submission', (req, res) => {
  const sid = req.query.sid;
  const qid = req.query.qid;
  const sql = 'Select * from Submissions where qid= ? and sid = ?';
  db.query(sql, [qid, sid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});

router.put('/gradeSubmission', (req, res) => {
  const sql = 'UPDATE Submissions set grade= ?, comment = ? where qid = ? and sid = ?';
  db.query(sql, [grade, comment, qid, sid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Submission graded successfully", results });
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

// router.get('/allQuestions', (req, res) => {
//   const tid = req.query.tid;
//   const sql = 'SELECT q.qid, q.question, q.description, q.pointVal, q.imgFile, q.topic, q.type, q.dueDate ' +
//     'From Questions q Where tid = ?';
//   db.query(sql, [tid], (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ results });

//   });
// });

router.get('/allQuestions', (req, res) => {
  const tid = req.query.tid;

  const sql = `
    SELECT q.qid, q.question, q.description, q.pointVal, q.imgFile, q.topic, q.type, q.dueDate
    FROM Questions q
    WHERE tid = ?
  `;

  db.query(sql, [tid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Convert imgFile BLOBs to base64 URIs
    const updatedResults = results.map(row => {
      let base64Image = null;
      if (row.imgFile) {
        const mimeType = 'image/jpeg'; // or determine this dynamically
        const buffer = Buffer.from(row.imgFile); // Ensure it's a Buffer
        base64Image = `data:${mimeType};base64,${buffer.toString('base64')}`;
      }

      return {
        ...row,
        imgFile: base64Image
      };
    });

    res.json({ results: updatedResults });
  });
});

router.get('/getQuestion', (req, res) => {
  const qid = req.query.qid;
  const sql = 'SELECT * FROM Questions WHERE qid = ?';

  db.query(sql, [qid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0 && results[0].imgFile) {
      results[0].imgFile = `data:image/jpeg;base64,${results[0].imgFile.toString('base64')}`;
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
    res.json({ results });
  });
});

router.delete('/removeStudent', (req, res) => {
  const { cid, sid } = req.query;
  const sql = 'DELETE FROM Enrolled WHERE cid = ? AND sid = ?';
  db.query(sql, [cid, sid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Student removed from course' });
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
    res.json({ results });
  });
});

router.put('/course/:cid', (req, res) => {
  const { cid } = req.params;
  const { courseName, description } = req.body;

  if (!courseName) {
    return res.status(400).json({ error: 'Missing Course Name' });
  }
  const sql = 'UPDATE Classes SET courseName = ?, description = ? WHERE cid = ?';
  db.query(sql, [courseName, description, cid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Course updated successfully' });
  });

});
router.put('/updateQuestion/:qid', upload.single('imgFile'), (req, res) => {
  const { qid } = req.params;
  const { question, description, pointVal, topic, type, dueDate } = req.body;
  const imgFile = req.file ? req.file.buffer : null;
  if (!question || !description || !pointVal || !topic || !type || !dueDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const sql = 'UPDATE Questions SET question = ?, description = ?, pointVal = ?, imgFile = ?, topic = ?, type = ?, dueDate = ? WHERE qid = ?';
  db.query(sql, [question, description, pointVal, imgFile, topic, type, dueDate, qid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});

router.delete('/course/:cid', (req, res) => {
  const { cid } = req.params;

  const sql = 'DELETE FROM Classes WHERE cid = ?';
  db.query(sql, [cid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Course Deleted successfully' });
  });

});


router.get('/students', (req, res) => { //working
  const tid = req.query.tid;
  const sql = 'Select e.cid, distinct u.userID, u.fname, u.lname From Users u join Enrolled e on u.UserID = e.sid where e.tid = ? and e.sid = u.UserID';
  db.query(sql, [tid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});

router.get('/:tid/courses', async (req, res) => {
  const { tid } = req.params;
  const sql = `
    SELECT e.cid, c.courseName, u.userID, u.fname, u.lname
    FROM Enrolled e
    JOIN Users u ON e.sid = u.userID
    JOIN Classes c ON e.cid = c.cid
    WHERE e.tid = ?
    ORDER BY c.courseName, u.lname, u.fname`;

  db.execute(sql, [tid], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Something went wrong');
    }

    const courses = {};
    for (const row of results) {
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
    }

    res.json(Object.values(courses));
  });
});


router.get('/assignments', (req, res) => {
  const qid = req.query.qid;

  const sqlStudents = 'SELECT sid FROM AssignedToStudent WHERE qid = ?';
  const sqlClasses = 'SELECT cid FROM AssignedToClass WHERE qid = ?';
  db.query(sqlStudents, [qid], (err, studentResults) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.query(sqlClasses, [qid], (err, classResults) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        message: 'Assignments retrieved successfully',
        students: studentResults,
        classes: classResults
      });
    });
  });
});

router.get('/QsByStudent', (req, res) => {
  const tid = req.query.tid;
  const sid = req.query.sid;
  const sql = 'SELECT DISTINCT q.qid, q.question, q.description, q.pointVal, q.imgFile, q.topic, q.type, q.dueDate, ats.viewable as classView From Questions q RIGHT JOIN AssignedToStudent ats on q.qid = ats.qid Where ats.sid = ? and q.tid = ?;'
  db.query(sql, [sid, tid], (err, response) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: 'Assignments retrieved successfully',
      QsByStudnet: response,
    });
  });
});



// Export the router
module.exports = router;
