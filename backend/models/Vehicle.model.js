import mongoose from "mongoose";
import { maxLength, unknown, uppercase } from "zod";

const vehicleSchema = new mongoose.Schema({
    // Registration (text)
    regNumber: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        match: [/^[A-Z]{2}[0-9]{2}\s?[A-Z]{3}$/, 'Invalid UK registration number format'],
    },
    make: {
        type: String,
        required: true,
        trim: true,
        uppercase:true,
        minlength: 2,
        maxlength: 50
    },
    model: {
        type: String,
        required: true,
        trim: true,
        uppercase:true,
        minlength: 1,
        maxlength: 60,
    },
    regNormalized: { 
        type: String, 
        required: true,
        unique: true,
        uppercase: true,
        select: false 
    },
    leaseCompany:{
        type:String,
        required:true,
        trim: true,
        maxLength: 100,
        uppercase: true
    },
    leaseEndDate:{
        type:Date,
        required:true,
        validate: {
            validator: v => v instanceof Date && Number.isFinite(v.getTime()),
            message: 'Lease end date must be a valid date'
        }
    },
    location:{
        type:String,
        required:false,
        trim:true
    },
    lastValet: {
        type: Date,
        default: null,
        max: [Date.now, 'Last valet date must be in the past or today'],
        validate: {
          validator: v => v == null || (v instanceof Date && Number.isFinite(v.getTime())),
          message: 'Last valet must be a valid date'
        }
    },
    mileage:{
        type:Number,
        required:true,
        min: 0, 
        set: v => Math.round(v)
    },
    fuel:{
        type:Number,
        required:true,
        min: 0, max: 100,
        set: v => Math.round(v)
    },
    powertrain: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ['electric','hybrid','petrol','diesel','unknown'],
        default: unknown
    },
    gearbox: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ['automatic', 'manual', 'unknown'],
        default: unknown,
        set: v => String(v).trim().toLowerCase().replace(/^auto$/, 'automatic'),
    }
},{
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

function normalizeReg(reg) {
  return String(reg || '').replace(/\s+/g, '').toUpperCase();
}

vehicleSchema.pre('validate', function(next) {
  if (this.isModified('regNumber') || this.isNew) {
    this.regNormalized = normalizeReg(this.regNumber);
  }
  next();
});

// // Indexes (for speed/uniqueness)
// VehicleSchema.index({ regNormalized: 1 }, { unique: true });
// VehicleSchema.index({ leaseEndDate: 1 });

// // Virtual (computed)
// VehicleSchema.virtual('regFormatted').get(function () {
//   const s = this.regNormalized || '';
//   return /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/.test(s)
//     ? `${s.slice(0,2)}${s.slice(2,4)} ${s.slice(4)}`
//     : this.regNumber;
// });

// // Instance method (document.method())
// VehicleSchema.methods.isLeaseExpiringSoon = function(days = 30) {
//   if (!this.leaseEndDate) return false;
//   const inDays = (this.leaseEndDate - new Date()) / (1000*60*60*24);
//   return inDays <= days;
// };

// // Static method (Model.method())
// VehicleSchema.statics.findByReg = function (input) {
//   const key = String(input).replace(/[^A-Za-z0-9]/g, '').toUpperCase();
//   return this.findOne({ regNormalized: key });
// };



const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;
