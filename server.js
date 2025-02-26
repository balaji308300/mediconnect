const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mediconnect", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 🟢 User Schema (For Patients)
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String, // ⚠️ No Hashing (Not Secure)
});

const User = mongoose.model("User", UserSchema);

// 🟢 Doctor Schema (For Doctors)
const DoctorSchema = new mongoose.Schema({
  doctorId: String, // Unique ID provided by Admin
  name: String,
  specialization: String,
  password: String, // ⚠️ No Hashing (For now, it's plain text)
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

// 🟢 Appointment Schema (For Storing Appointments)
const AppointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  doctorName: { type: String, required: true },
  specialization: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  mobile: { type: String, required: true },
  gender: { type: String, required: true },
  message: { type: String },
  appointmentDate: { type: Date, required: true },
  status: { type: String, default: "Accepted" }, // Default status to Accepted
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

// 🟢 Message Schema (For Storing Messages & Appointment Details)
const MessageSchema = new mongoose.Schema({
  name: String,
  address: String,
  mobile: String,
  gender: String,
  message: String, // User's message
  status: String,
  appointmentDate: Date,
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

// 🟢 SIGNUP API (For Patients)
app.post("/api/signup", async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = new User({ name, email, mobile, password });
  await newUser.save();

  res.json({ message: "Signup successful" });
});

// 🔵 LOGIN API (For Patients)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", user });
});

// 🔴 ADMIN ADDS DOCTOR API
app.post("/api/admin/add-doctor", async (req, res) => {
  const { doctorId, name, specialization, password } = req.body;

  const existingDoctor = await Doctor.findOne({ doctorId });
  if (existingDoctor) {
    return res.status(400).json({ success: false, message: "Doctor ID already exists" });
  }

  const newDoctor = new Doctor({ doctorId, name, specialization, password });
  await newDoctor.save();

  res.json({ success: true, message: "Doctor added successfully" });
});

// 🔵 DOCTOR LOGIN API (Using Doctor ID)
app.post("/api/doctor-login", async (req, res) => {
  const { doctorId, password } = req.body;

  const doctor = await Doctor.findOne({ doctorId, password });
  if (!doctor) {
    return res.status(401).json({ success: false, message: "Invalid Doctor ID or Password" });
  }

  res.json({ success: true, message: "Login successful", doctor });
});

// 🔵 FETCH ALL DOCTORS API
app.get("/api/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Fetch all doctors from DB
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
});

// 🟠 BOOK APPOINTMENT API (Stores Appointment in MongoDB)
app.post("/api/appointments", async (req, res) => {
  try {
    const { doctorId, doctorName, specialization, name, address, mobile, gender, message, appointmentDate } = req.body;

    const newAppointment = new Appointment({
      doctorId,
      doctorName,
      specialization,
      name,
      address,
      mobile,
      gender,
      message,
      appointmentDate,
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
});

// 🔵 FETCH ALL APPOINTMENTS API
app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

// 🔵 FETCH APPOINTMENT DETAILS BY MOBILE
app.get("/api/appointments/mobile/:mobile", async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ mobile: req.params.mobile });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment details", error });
  }
});

// 🟢 UPDATE APPOINTMENT STATUS API
app.put("/api/appointments/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Status updated successfully", updatedAppointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
});

// 🟢 STORE MESSAGE & APPOINTMENT DETAILS IN A SEPARATE COLLECTION
app.post("/api/messages", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ success: true, message: "Message stored successfully" });
  } catch (error) {
    console.error("Error storing message:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// 🟢 FETCH ALL MESSAGES API
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // Fetch latest first
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
});


// 🟢 Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
