const express = require("express");
// const mysql = require('mysql2');
const router = express.Router();
// const cors = require('cors');
const db = require("../db");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// app.use(cors());
// app.use(express.json());

// Define your routes
router.get("/", (req, res) => {
  res.send("Student route");
});

router.get("/specificAssignedQuestions", (req, res) => {
  const sid = req.query.sid;
  const tid = req.query.tid;
  const sql =
    "SELECT DISTINCT q.*, ats.viewable as studentView, atc.viewable as classView FROM Questions q " +
    "LEFT JOIN AssignedToStudent ats ON q.qid = ats.qid " +
    "LEFT JOIN Instructor i ON c.tid = i.tid WHERE (ats.sid = ? AND i.tid = ?) OR (e.sid = ? AND i.tid = ?);";
  db.query(sql, [sid, tid, sid, tid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});

router.get("/questions", (req, res) => {
  const cid = req.query.cid;
  const sql =
    "SELECT DISTINCT q.qid, q.question, q.description, q.pointVal, q.imgFile, q.topic, q.type, q.dueDate, atc.viewable as classView " +
    "From Questions q RIGHT JOIN AssignedToClass atc on q.qid = atc.qid Where cid = ?";
  db.query(sql, [cid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});

router.post("/submitQuestion", upload.single("imgFile"), (req, res) => {
  const { qid, sid, answer, progress, submitted_on } = req.body;
  const imgFile = req.file ? req.file.buffer : null;
  const sql = `
    INSERT INTO Submissions (qid, sid, answer, progress, submitted_on, imgFile)
    VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [qid, sid, answer, progress, submitted_on, imgFile],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ results });
    }
  );
});

router.post("/joinCourse", async (req, res) => {
  const { sid, cid } = req.body;
  const sql = `
    INSERT INTO Enrolled (sid, cid)
    VALUES (?, ?);`;
  db.query(sql, [sid, cid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});

router.get("/getCourses", async (req, res) => {
  const sid = req.query.sid;
  const sql = `
    SELECT Classes.courseName, Classes.description, Classes.cid, Enrolled.tid
    FROM Enrolled
    JOIN Classes ON Enrolled.cid = Classes.cid
    WHERE Enrolled.sid = ?;`;
  db.query(sql, [sid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});

router.get("/getCourseData", async (req, res) => {
  const cid = req.query.cid;
  const sql = `
    SELECT q.*
    FROM Questions q
    JOIN Classes c ON q.tid = c.tid
    WHERE c.cid = ?;
  `;
  db.query(sql, [cid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});

router.get("/getAllPastDueQuestions", async (req, res) => {
  const { sid } = req.query;

  const classSql = `
    SELECT DISTINCT q.*
    FROM Questions q
    INNER JOIN AssignedToClass atc ON q.qid = atc.qid
    INNER JOIN Enrolled e ON atc.cid = e.cid
    WHERE e.sid = ?
      AND DATE(q.dueDate) < CURDATE()
    ORDER BY q.dueDate ASC;
  `;

  const studentSql = `
    SELECT DISTINCT q.*
    FROM Questions q
    INNER JOIN AssignedToStudent ats ON q.qid = ats.qid
    WHERE ats.sid = ?
      AND DATE(q.dueDate) < CURDATE()
    ORDER BY q.dueDate ASC;
  `;

  try {
    const [classResults] = await db.promise().query(classSql, [sid]);
    const [studentResults] = await db.promise().query(studentSql, [sid]);

    res.json({
      results: {
        pastDueClass: classResults || [],
        pastDueStudent: studentResults || []
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getAllUpcomingQuestions", async (req, res) => {
  const { sid } = req.query;

  const classSql = `
    SELECT DISTINCT q.*
    FROM Questions q
    INNER JOIN AssignedToClass atc ON q.qid = atc.qid
    INNER JOIN Enrolled e ON atc.cid = e.cid
    WHERE e.sid = ?
      AND DATE(q.dueDate) >= CURDATE()
    ORDER BY q.dueDate ASC;
  `;

  const studentSql = `
    SELECT DISTINCT q.*
    FROM Questions q
    INNER JOIN AssignedToStudent ats ON q.qid = ats.qid
    WHERE ats.sid = ?
      AND DATE(q.dueDate) >= CURDATE()
    ORDER BY q.dueDate ASC;
  `;

  try {
    const [classResults] = await db.promise().query(classSql, [sid]);
    const [studentResults] = await db.promise().query(studentSql, [sid]);

    res.json({
      results: {
        upcomingClass: classResults || [],
        upcomingStudent: studentResults || []
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getUpcomingCourseQuestions", async (req, res) => {
  const { sid, cid } = req.query;

  const classSql = `
  SELECT DISTINCT q.*
  FROM Questions q
  INNER JOIN AssignedToClass atc ON q.qid = atc.qid
  INNER JOIN Enrolled e ON atc.cid = e.cid
  LEFT JOIN MCQ mcq ON q.qid = mcq.qid
  WHERE e.sid = ? AND e.cid = ?
    AND DATE(q.dueDate) >= CURDATE()
  ORDER BY q.dueDate ASC;
`;

const studentSql = `
  SELECT DISTINCT q.*
  FROM Questions q
  INNER JOIN AssignedToStudent ats ON q.qid = ats.qid
  INNER JOIN Enrolled e ON ats.sid = e.sid
  LEFT JOIN MCQ mcq ON q.qid = mcq.qid
  WHERE ats.sid = ? AND e.cid = ?
    AND DATE(q.dueDate) >= CURDATE()
  ORDER BY q.dueDate ASC;
`;

  try {
    const [classResults] = await db.promise().query(classSql, [sid, cid]);
    const [studentResults] = await db.promise().query(studentSql, [sid, cid]);

    res.json({
      results: {
        upcomingClass: classResults || [],
        upcomingStudent: studentResults || [],
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getPastDueCourseQuestions", async (req, res) => {
  const { sid, cid } = req.query;

  const classSql = `
    SELECT DISTINCT q.*
    FROM Questions q
    INNER JOIN AssignedToClass atc ON q.qid = atc.qid
    INNER JOIN Enrolled e ON atc.cid = e.cid
    LEFT JOIN MCQ mcq ON q.qid = mcq.qid
    WHERE e.sid = ? AND e.cid = ?
      AND DATE(q.dueDate) < CURDATE()
    ORDER BY q.dueDate ASC;
  `;

  const studentSql = `
    SELECT DISTINCT q.*
    FROM Questions q
    INNER JOIN AssignedToStudent ats ON q.qid = ats.qid
    INNER JOIN Enrolled e ON ats.sid = e.sid
    LEFT JOIN MCQ mcq ON q.qid = mcq.qid
    WHERE ats.sid = ? AND e.cid = ?
      AND DATE(q.dueDate) < CURDATE()
    ORDER BY q.dueDate ASC;
  `;

  try {
    const [classResults] = await db.promise().query(classSql, [sid, cid]);
    const [studentResults] = await db.promise().query(studentSql, [sid, cid]);

    res.json({
      results: {
        pastDueClass: classResults || [],
        pastDueStudent: studentResults || [],
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
