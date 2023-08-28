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
    constructor(firstName: string, lastName: string, doctorID: number, specialization: string, address: string, age: number, staffID: number, position: string, department: string, availability: string[]) {
        super(firstName, lastName, address, age, staffID, position, department, availability)
        this._doctorID = doctorID
        this.specialization = specialization
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
    status: AppointmentStatus
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
        this.Appointments.push(newAppointment)
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
    getDoctorbyDate(doctor: doctor, date: string):doctor[] {
        let arr: doctor[] = []
        for (let i = 0; i < this.Appointments.length; i++) {
            if (this.Appointments[i].doctor === doctor) {
                if (this.Appointments[i].date === date) {
                    arr.push(this.Appointments[i].doctor)
                }
            }
        }
        return arr
    }
}
