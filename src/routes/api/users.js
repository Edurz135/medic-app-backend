const router = require("express").Router();
const {
  Answer,
  Comment,
  Date,
  Doctor,
  ExtraNote,
  Medicament,
  Patient,
  Question,
  Specialty,
} = require("../../db");

router.get("/", async (req, res) => {
  res.json("OK");
});

router.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  res.status(202).json("recibido: " + email + "  " + password);
});

router.post("/patientregister", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(202).json({ status: "success", result: patient });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(403).json({ status: "error", message: "User already exists" });
    } else {
      res
        .status(500)
        .send({ status: "error", message: "Something went wrong" });
    }
  }
});

router.post("/doctorregister", async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.json({ status: "success", result: doctor });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(403).json({ status: "error", message: "User already exists" });
    } else {
      res
        .status(500)
        .json({ status: "error", message: "Something went wrong" });
    }
  }
});

router.get("/setup", async (req, res) => {
  const list = [
    "Alergología",
    "Cardiología",
    "Dermatología",
    "Ecografía",
    "Endocrinología",
    "Gastroenterología",
    "Geriatría",
    "Ginecología Oncológica",
    "Ginecología y Obstetricia",
    "Hematología",
    "Mastología",
    "Medicina Física y Rehabilitación",
    "Medicina General",
    "Medicina Interna",
    "Nefrología",
    "Neumología",
    "Neurología",
    "Nutrición",
    "Odontología Infantil u Odontopediatría",
    "Odontología Integral",
    "Odontología. Endodoncia",
    "Odontología. Ortodoncia y Ortopedia",
    "Odontología. Periodoncia e Implantología",
    "Odontología. Rehabilitación Oral",
    "Oftalmología",
    "Otorrinolaringología",
    "Pediatría",
    "Radiología",
    "Reumatologia",
    "Traumatologia y Ortopedia",
    "Urología",
  ];

  list.forEach(async (element) => {
    await Specialty.create({
      name: element,
    });
  });

  const doctor1 = {
    email: "doctor1@gmail.com",
    name: "Doctor1",
    age: "30",
    gender: "M",
    specialty: "1",
    phoneNumber: "999999999",
    attentionDays: "1111100",
    mondayStart: "7:00",
    tuesdayStart: "7:00",
    wednesdayStart: "7:00",
    thursdayStart: "7:00",
    fridayStart: "7:00",
    saturdayStart: "7:00",
    sundayStart: "7:00",
    mondayEnd: "17:00",
    tuesdayEnd: "17:00",
    wednesdayEnd: "17:00",
    thursdayEnd: "17:00",
    fridayEnd: "17:00",
    saturdayEnd: "17:00",
    sundayEnd: "17:00",
  };
  await Doctor.create(doctor1);

  const doctor2 = {
    email: "doctor2@gmail.com",
    name: "Doctor2",
    age: "40",
    gender: "M",
    specialty: "2",
    phoneNumber: "999999999",
    attentionDays: "1111100",
    mondayStart: "7:00",
    tuesdayStart: "7:00",
    wednesdayStart: "7:00",
    thursdayStart: "7:00",
    fridayStart: "7:00",
    saturdayStart: "7:00",
    sundayStart: "7:00",
    mondayEnd: "17:00",
    tuesdayEnd: "17:00",
    wednesdayEnd: "17:00",
    thursdayEnd: "17:00",
    fridayEnd: "17:00",
    saturdayEnd: "17:00",
    sundayEnd: "17:00",
  };
  await Doctor.create(doctor2);

  const patient1 = {
    email: "patient1@gmail.com",
    password: "1234",
    firstName: "patient1",
    lastName: "user",
    age: "30",
    gender: "F",
    idMedicalRecord: "2",
  };
  await Patient.create(patient1);

  const patient2 = {
    email: "patient2@gmail.com",
    password: "1234",
    firstName: "patient2",
    lastName: "user",
    age: "30",
    gender: "M",
    idMedicalRecord: "2",
  };
  await Patient.create(patient2);

  const date1 = {
    startDate: "2022-07-07T11:00:00",
    endDate: "2022-07-07T11:15:00",
    diagnostic: "",
    patientId: 1,
    doctorId: 1,
  };

  await Date.create(date1);

  res.json({ status: "sucess" });
});

router.post("/createdate", async (req, res) => {
  try {
    const patientId = req.body.patientId;
    const doctorId = req.body.doctorId;

    const patient = await Patient.findByPk(patientId);
    const doctor = await Doctor.findByPk(doctorId);

    const a = await Date.findOne({
      where: {
        patientId: patientId,
        startDate: req.body.startDate,
      },
    });

    const b = await Date.findOne({
      where: {
        doctorId: doctorId,
        startDate: req.body.startDate,
      },
    });

    if (!a && !b) {
      const date = await Date.create({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        diagnostic: "",
        patientId: patientId,
        doctorId: doctorId,
      });
      res.status(202).json({ status: "success", result: date });
    } else {
      res.status(403).json({
        status: "error",
        message: "Doctor or Patient has a date on this date",
      });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
});

router.get("/getdates", async (req, res) => {
  try {
    const dates = await Date.findAll({
      where: {
        doctorId: req.query.doctorId,
      },
    });
    res.status(202).json({ status: "success", result: dates });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
});

router.get("/getpatient", async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        id: req.query.id,
      },
    });
    res.status(202).json({ status: "success", result: patient });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
});

//api/users/getextranotes?dateId=1
router.get("/getextranotes", async (req, res) => {
  try {
    const extraNotes = await ExtraNote.findAll({
      where: {
        dateId: req.query.dateId,
      },
    });
    res.status(202).json({ status: "success", result: extraNotes });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
});

router.post("/createextranote", async (req, res) => {
  try {
    const date = await ExtraNote.create(req.body);
    res.status(202).json({ status: "success", result: date });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
});

router.get("/getspecialties", async (req, res) => {
  try {
    const specialties = await Specialty.findAll();
    res.status(202).json({ status: "success", result: specialties });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
});

router.get("/getspecialty", async (req, res) => {
  try {
    const specialty = await Specialty.findOne({
      where: {
        id: req.query.id,
      },
    });
    res.status(202).json({ status: "success", result: specialty });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
});

module.exports = router;
