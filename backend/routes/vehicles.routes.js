import { Router } from "express";
import Vehicle from "../models/Vehicle.model.js";
import vehicleZod from "../models/Vehicle.zod.js";

const vehicleRouter = Router();

vehicleRouter.get('/allVehicles', async (req,res) => {
    try {
        const vehicles = await Vehicle.find({}).lean({ virtuals: true });
        return res.status(200).json(vehicles);
    } catch (error) {
        console.error('[GET /allVehicles]', error);
        return res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
})

const normalizeReg = (reg) =>
  String(reg).toUpperCase().replace(/[\s-]/g, '');


vehicleRouter.post('/newVehicle', async (req,res) => {
    try {
        //  Validation
        const result = vehicleZod.safeParse({
            regNumber: req.body.reg,
            make: req.body.make,
            model: req.body.model,
            leaseCompany: req.body.leaseCompany,
            leaseEndDate: req.body.leaseEndDate,
            location: req.body.location,
            lastValet: req.body.lastValet,
            mileage: req.body.mileage,
            fuel: req.body.fuel,
            powertrain: req.body.powertrain,
            gearbox: req.body.gearbox,
        });

        if(!result.success){
            return res.status(400).json({
                error: 'ValidationError',
                details: result.error.issues.map(e => ({
                    path: e.path.join('.'),
                    message: e.message
                }))
            })
        }

        const data = result.data;
        const regNormalized = normalizeReg(data.regNumber);

        // check to see if vehicle exists
        const vehicle = await Vehicle.findOne({regNormalized})
        if(vehicle != null){
            return res.status(409).json({ error: 'Vehicle exists' });
        }

        // create new vehicle
        const doc = await Vehicle.create({
            ...data,
            regNormalized,
        });

        res.status(201).json({message: 'Vehicle succesfully created.'})

    } catch (error) {
        console.error('[PUT /vehicles]', error);
        return res.status(500).json({ error: 'Failed to create vehicle' });
    }
})

export default vehicleRouter;