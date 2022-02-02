const studentsRoutes = require('express').Router();

const path = require('path');
const fs = require('fs');
const studentsDB = require('../db/students.json');

function saveToFile(data) {
  fs.writeFileSync('./db/students.json', JSON.stringify(data));
}

studentsRoutes.get('/', (req, res) => {
  res.json(studentsDB);
});

studentsRoutes.post('/', (req, res) => {
  if (!req.body.name) {
    res.status(500).json({ error: 'You forgot to send the name' });
    return;
  };
  
  const newStudent = {
    ...req.body,
    id: new Date().getTime(),
  };

  studentsDB.push(newStudent);

  saveToFile(studentsDB);

  res.status(201).json(newStudent);
});

studentsRoutes.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = studentsDB.findIndex(student => String(student.id) === id);
  if(index < 0){
      res.status(500).json({error:'ID not found'})
      return;
  }
  studentsDB.splice(index, 1)
  saveToFile(studentsDB);
  res.status(200).json(studentsDB);
});

studentsRoutes.put('/:id', (req, res) => {
    const id = req.params.id;
    const studentData = req.body;
    const index = studentsDB.findIndex(student => String(student.id) === id);
    if(index < 0){
        res.status(500).json({error:'ID not found'})
        return;
    }
    studentsDB.splice(index, 1, {
        ...studentsDB[index],
        ...studentData
    })
    saveToFile(studentsDB);
    res.status(200).json(studentsDB);
  });

module.exports = studentsRoutes;
