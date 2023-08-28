abstract class person {
    firstName: string;
    lastName: string;
    address: string
    age: number
    constructor(firstName: string, lastName: string, address: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age
        this.address = address
    }

    abstract info(): string;
}
class patient extends person {
    protected _patientID: number;
    phoneNumber: number
    emergencyContact: string
    medicalHistory: Appointment[]
    constructor(firstName: string, lastName: string, patientID: number, address: string, age: number, phoneNumber: number, emergencyContact: string, medicalHistory: Appointment[]) {
        super(firstName, lastName, address, age)
        this._patientID = patientID
        this.phoneNumber = phoneNumber
        this.emergencyContact = emergencyContact
        this.medicalHistory = medicalHistory
    }
    get patientID(): number {
        return this._patientID;
    }
    addAppointment(tor: Appointment) {
        this.medicalHistory.push(tor)
    }
    info(): string {
        return `full name: ${this.firstName} ${this.lastName} ,id: ${this._patientID}`
    }
}
class medicalStaff extends person {
    staffID: number
    position: string
    department: string
    availability: string[]
    constructor(firstName: string, lastName: string, address: string, age: number, staffID: number, position: string, department: string, availability: string[]) {
        super(firstName, lastName, address, age)
        this.staffID = staffID
        this.position = position
        this.department = department
        this.availability = availability
    }
    info(): string {
        return `medical staff: name: ${this.firstName} ${this.lastName}, address: ${this.address}, age: ${this.age}, id: ${this.staffID}, position: ${this.position}, department: ${this.department}`;
    }
}
class doctor extends medicalStaff {
    protected _doctorID: number
    specialization: string
    minAge: number
    maxAge: number
    constructor(firstName: string, lastName: string, doctorID: number, specialization: string, address: string, age: number, staffID: number, position: string, department: string, availability: string[], minAge: number, maxAge: number) {
        super(firstName, lastName, address, age, staffID, position, department, availability)
        this._doctorID = doctorID
        this.specialization = specialization
        this.maxAge = maxAge
        this.minAge = minAge
    }
    get doctorID(): number {
        return this._doctorID;
    }
    info(): string {
        return `full name: ${this.firstName} ${this.lastName} ,id: ${this._doctorID}, specialization: ${this.specialization} `
    }
}
enum AppointmentStatus {
    Canceled = "cancelled",
    Approved = "Confirmed",
    designed = "designed"
}
class Appointment {
    patient: patient
    doctor: doctor
    date: string
    time: string
    status: string
    constructor(patient: patient, doctor: doctor, date: string, time: string, status: AppointmentStatus.designed) {
        this.patient = patient
        this.doctor = doctor
        this.date = date
        this.time = time
        this.status = status
    }
    info(): string {
        return `patient: ${this.patient.info()}, doctor: ${this.doctor.info()}, date: ${this.date}, time: ${this.time}  `
    }
    changeStatus(toChange: AppointmentStatus): void {
        this.status = toChange;
    }
}

class MedicalRecord {
    patient1: patient
    doctor1: doctor
    diagnosis: string
    prescription: string
    constructor(patient1: patient, doctor1: doctor, diagnosis: string, prescription: string) {
        this.diagnosis = diagnosis
        this.doctor1 = doctor1
        this.patient1 = patient1
        this.prescription = prescription
    }
}

class hospital {
    Appointments: Appointment[]
    doctors: doctor[]
    patients: patient[]
    name: string
    MedicalRecords: MedicalRecord[]

    constructor(patients: patient[], doctors: doctor[], name: string, Appointments: Appointment[], MedicalRecords: MedicalRecord[]) {
        this.patients = patients
        this.doctors = doctors
        this.Appointments = Appointments
        this.name = name
        this.MedicalRecords = MedicalRecords
    }
    addPatient(newPatient: patient): void {
        this.patients.push(newPatient)
    }
    addDoctor(newDoctor: doctor): void {
        this.doctors.push(newDoctor)
    }
    addAppointment(newAppointment: Appointment): void {
        let b: Boolean = true
        for (let i = 0; i < this.Appointments.length; i++) {
            if (this.Appointments[i].date === newAppointment.date && this.Appointments[i].time === newAppointment.time) {
                b = false
            }
        }
        if (b) {
            for (let i = 0; i < this.doctors.length; i++) {
                if (newAppointment.doctor === this.doctors[i]) {
                    if (newAppointment.patient.age > newAppointment.doctor.minAge && newAppointment.patient.age < newAppointment.doctor.maxAge) {
                        this.Appointments.push(newAppointment)
                    }
                }
            }
        }
    }
    showAppointments(): void {
        for (let i = 0; i < this.Appointments.length; i++) {
            console.log(this.Appointments[i].info())
        }
    }
    showAppointmentsByDoc(doctorID: number): void {
        for (let i = 0; i < this.Appointments.length; i++) {
            if (this.Appointments[i].doctor.doctorID === doctorID) {
                console.log(this.Appointments[i].info())
            }
        }
    }
    showAppointmentsByPat(patientID: number): void {
        for (let i = 0; i < this.Appointments.length; i++) {
            if (this.Appointments[i].patient.patientID === patientID) {
                console.log(this.Appointments[i].info());
            }
        }
    }

    showAppointmentsByDay(): void {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        for (let i = 0; i < this.Appointments.length; i++) {
            if (this.Appointments[i].date === currentDate) {
                console.log(this.Appointments[i].info())
            }
        }
    }
    getDoctorbySpecialization(specialization: string): doctor[] {
        let arr: doctor[] = this.doctors
        arr.filter(doctor => doctor.specialization === specialization)
        return arr
    }
    createMedicalRecord(MedicalRecord: MedicalRecord) {
        this.MedicalRecords.push(MedicalRecord)
    }
    getMedicalRecords(patient: patient): MedicalRecord[] {
        const arr = this.MedicalRecords.filter(medical => medical.patient1 === patient)
        return arr
    }
    getDoctorbyDate(doctor: doctor, date: string): doctor[] {
        let arr: doctor[] = []
        for (let i = 0; i < this.Appointments.length; i++) {
            if (this.Appointments[i].doctor === doctor) {
                if (this.Appointments[i].date === date && this.Appointments[i].status === "designed") {
                    arr.push(this.Appointments[i].doctor)
                }
            }
        }
        return arr
    }
}


// יצירת מטופלים, רופאים ומטפלים
const patient1 = new patient("John", "Doe", 1, "123 Main St", 30, 1234567890, "Jane Doe", []);
const doctor1 = new doctor("Dr.", "Smith", 1, "Cardiologist", "456 Heart Ave", 45, 101, "Senior Doctor", "Cardiology", ["Monday", "Wednesday"], 30, 70);
const doctor2 = new doctor("Dr.", "Johnson", 2, "Pediatrician", "789 Kids St", 50, 102, "Senior Doctor", "Pediatrics", ["Tuesday", "Thursday"], 0, 18);

// יצירת תורים
const appointment1 = new Appointment(patient1, doctor1, "2023-08-27", "10:00 AM", AppointmentStatus.designed);
const appointment2 = new Appointment(patient1, doctor2, "2023-08-28", "11:00 AM", AppointmentStatus.designed);

// יצירת רשומות רפואיות
const medicalRecord1 = new MedicalRecord(patient1, doctor1, "High Blood Pressure", "Prescription: Medication A");

// יצירת בית חולים
const myHospital = new hospital([patient1], [doctor1, doctor2], "Healthcare Hospital", [appointment1, appointment2], [medicalRecord1]);

// הוספת רופא ומטופל חדשים
const newDoctor = new doctor("Dr.", "Brown", 3, "Dermatologist", "321 Skin St", 35, 103, "Junior Doctor", "Dermatology", ["Friday"], 25, 65);
const newPatient = new patient("Alice", "Johnson", 2, "987 Elm St", 25, 9876543210, "Bob Johnson", []);

myHospital.addDoctor(newDoctor);
myHospital.addPatient(newPatient);

// יצירת תור חדש והוספתו לבית החולים
const newAppointment = new Appointment(newPatient, newDoctor, "2023-08-29", "2:00 PM", AppointmentStatus.designed);
myHospital.addAppointment(newAppointment);

// הצגת כל התורים בבית החולים
console.log("All Appointments:");
myHospital.showAppointments();

// הצגת רשומות רפואיות של מטופל
console.log("Medical Records for Patient:");
const patientMedicalRecords = myHospital.getMedicalRecords(newPatient);
patientMedicalRecords.forEach(record => {
    console.log(record.diagnosis, record.prescription);
});

// הצגת רשומות תורים לפי רופא
console.log("Appointments by Doctor:");
myHospital.showAppointmentsByDoc(1);

// עדכון סטטוס תור
appointment1.changeStatus(AppointmentStatus.Approved);
console.log("Updated Appointment Status:");
console.log(appointment1.info());
