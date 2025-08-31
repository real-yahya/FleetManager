import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    // Registration (text)
    regNumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^[A-Z0-9 -]{1,8}$/i, 'Invalid registration format'],
    },
    make: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    model: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 60,
    },
    regNormalized: { 
        type: String, 
        required: true, 
        select: false 
    },
    leaseCompany:{
        type:String,
        required:true,
        trim: true
    },
    leaseEndDate:{
        type:Date,
        required:true,
        validate: v => v instanceof Date && !isNaN(v)
    },
    location:{
        type:String,
        required:false,
        trim:true
    },
    lastValet:{
        type:Date,
        default: null,
        validate: v => !v || v <= new Date()
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
      enum: ['electric','hybrid','petrol','diesel', 'unknown'],
    },

    gearbox: {
      type: String,
      required: true,
      lowercase: true, 
      trim: true,
      enum: ['automatic', 'manual', 'unknown'],
      set: v => String(v).trim().toLowerCase().replace(/^auto$/, 'automatic'),
    },
        
},{
    timestamps: true,
    versionKey: false,          // hide __v
    toJSON: { virtuals: true }, // include virtuals when JSONifying
    toObject: { virtuals: true }
});



vehicleSchema.pre('validate', function(next) {
  if (this.regNumber) {
    this.regNormalized = this.regNumber.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
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
