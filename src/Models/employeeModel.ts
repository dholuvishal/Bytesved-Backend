import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { ROLES, RoleType, MODULES, JOBPERIODS, JobPeriods} from '../Config/constant';

interface Employee extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  employeeId: string;
  joiningDate: Date;
  jobPeriod: JobPeriods;
  phone: string;
  company: string;
  department: string;
  designation: string;
  role: RoleType;
}

const employeeSchema = new mongoose.Schema<Employee>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  jobPeriod: {
    type: String,
    required: true,
    enum: Object.values(JOBPERIODS),
  },
  phone: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(ROLES),
  }
});

employeeSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    return false
  }
});

employeeSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

employeeSchema.virtual('profile', {
  ref: 'Profiles',
  localField: '_id',
  foreignField: 'user'
});

employeeSchema.virtual('salary', {
  ref: 'SalaryInformations',
  localField: '_id',
  foreignField: 'user'
});

employeeSchema.set('toObject', { virtuals: true });
employeeSchema.set('toJSON', { virtuals: true });

const Employee: Model<Employee> = mongoose.model<Employee>('Employee', employeeSchema);

export default Employee;
