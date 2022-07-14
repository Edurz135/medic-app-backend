const Sequelize = require("sequelize");

const {
  AnswerModel,
  CommentModel,
  DateModel,
  DoctorModel,
  ExtraNoteModel,
  MedicamentModel,
  PatientModel,
  QuestionModel,
  SpecialtyModel,
} = require("./models/index");

const sequelize = new Sequelize("medicappdb", "postgres", "1234", {
  dialect: "postgres",
});

const Answer = AnswerModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);
const Date = DateModel(sequelize, Sequelize);
const Doctor = DoctorModel(sequelize, Sequelize);
const ExtraNote = ExtraNoteModel(sequelize, Sequelize);
const Medicament = MedicamentModel(sequelize, Sequelize);
const Patient = PatientModel(sequelize, Sequelize);
const Question = QuestionModel(sequelize, Sequelize);
const Specialty = SpecialtyModel(sequelize, Sequelize);

Patient.hasMany(Date, { foreignKey: "patientId" });
Doctor.hasMany(Date, { foreignKey: "doctorId" });
Specialty.hasMany(Doctor, { foreignKey: "specialtyId" });

Date.hasMany(Medicament, { foreignKey: "dateId" });
Date.hasMany(ExtraNote, { foreignKey: "dateId" });

Patient.hasMany(Question, { foreignKey: "patientId" });
Doctor.hasMany(Answer, { foreignKey: "doctorId" });
Question.hasOne(Answer, { foreignKey: "questionId" });

Patient.hasMany(Comment, { foreignKey: "patientId" });

sequelize.sync({ force: false }).then(() => {
  console.log("Tablas sincronizadas.");
});

module.exports = {
  Answer,
  Comment,
  Date,
  Doctor,
  ExtraNote,
  Medicament,
  Patient,
  Question,
  Specialty,
};
