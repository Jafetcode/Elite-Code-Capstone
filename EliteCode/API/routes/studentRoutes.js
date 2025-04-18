const express = require("express");
// const mysql = require('mysql2');
const router = express.Router();
// const cors = require('cors');
const db = require("../db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

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

router.post("/submitQuestion", upload.single("file"), (req, res) => {
  const { qid, sid, answer, progress, submitted_on } = req.body;
  const fileName = req.file ? req.file.filename : null;
  const filePath = req.file ? req.file.path : null;
  const sql = `
    INSERT INTO Submissions (qid, sid, answer, progress, submitted_on, fileName, filePath)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [qid, sid, answer, progress, submitted_on, fileName, filePath],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Successfully submitted question", results, file: { name: fileName, path: filePath } });
    }
  );
});

router.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
    SELECT DISTINCT q.*, mcq.opt1, mcq.opt2, mcq.opt3
    FROM Questions q
    INNER JOIN AssignedToClass atc ON q.qid = atc.qid
    INNER JOIN Enrolled e ON atc.cid = e.cid
    LEFT JOIN MCQ mcq ON q.qid = mcq.qid
    WHERE e.sid = ?
      AND DATE(q.dueDate) < CURDATE()
    ORDER BY q.dueDate ASC;
  `;

  const studentSql = `
    SELECT DISTINCT q.*, mcq.opt1, mcq.opt2, mcq.opt3
    FROM Questions q
    INNER JOIN AssignedToStudent ats ON q.qid = ats.qid
    LEFT JOIN MCQ mcq ON q.qid = mcq.qid
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
        pastDueStudent: studentResults || [],
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getAllUpcomingQuestions", async (req, res) => {
  const { sid } = req.query;

  const classSql = `
    SELECT DISTINCT q.*, mcq.opt1, mcq.opt2, mcq.opt3
    FROM Questions q
    INNER JOIN AssignedToClass atc ON q.qid = atc.qid
    INNER JOIN Enrolled e ON atc.cid = e.cid
    LEFT JOIN MCQ mcq ON q.qid = mcq.qid
    WHERE e.sid = ?
      AND DATE(q.dueDate) >= CURDATE()
    ORDER BY q.dueDate ASC;
  `;

  const studentSql = `
    SELECT DISTINCT q.*, mcq.opt1, mcq.opt2, mcq.opt3
    FROM Questions q
    INNER JOIN AssignedToStudent ats ON q.qid = ats.qid
    LEFT JOIN MCQ mcq ON q.qid = mcq.qid
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
        upcomingStudent: studentResults || [],
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getUpcomingCourseQuestions", async (req, res) => {
  const { sid, cid } = req.query;

  const classSql = `
    SELECT DISTINCT q.*, mcq.opt1, mcq.opt2, mcq.opt3
    FROM Questions q
    INNER JOIN AssignedToClass atc ON q.qid = atc.qid
    INNER JOIN Enrolled e ON atc.cid = e.cid
    LEFT JOIN MCQ mcq ON q.qid = mcq.qid
    WHERE e.sid = ? AND e.cid = ?
      AND DATE(q.dueDate) >= CURDATE()
    ORDER BY q.dueDate ASC;
  `;

  try {
    const [classResults] = await db.promise().query(classSql, [sid, cid]);

    res.json({
      results: {
        upcomingClass: classResults || [],
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getPastDueCourseQuestions", async (req, res) => {
  const { sid, cid } = req.query;

  const classSql = `
    SELECT DISTINCT q.*, mcq.opt1, mcq.opt2, mcq.opt3
    FROM Questions q
    INNER JOIN AssignedToClass atc ON q.qid = atc.qid
    INNER JOIN Enrolled e ON atc.cid = e.cid
    LEFT JOIN MCQ mcq ON q.qid = mcq.qid
    WHERE e.sid = ? AND e.cid = ?
      AND DATE(q.dueDate) < CURDATE()
    ORDER BY q.dueDate ASC;
  `;

  try {
    const [classResults] = await db.promise().query(classSql, [sid, cid]);

    res.json({
      results: {
        pastDueClass: classResults || [],
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/submission", (req, res) => {
  const sid = req.query.sid;
  const qid = req.query.qid;
  const sql =
    "SELECT * FROM Submissions s join Questions q on s.qid = q.qid WHERE s.qid = ? and s.sid = ?;";

  db.query(sql, [qid, sid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log(results);
    res.json(results);
  });
});
module.exports = router;
