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

router.get("/fillSpecialty", async (req, res) => {
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

router.post("/getdates", async (req, res) => {
  try {
    const dates = await Date.findAll({
      where: {
        doctorId: req.body.doctorId,
      },
    });
    res.status(202).json({ status: "success", result: dates });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
});

module.exports = router;
