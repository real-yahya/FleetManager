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

        if (!result.success) {
            var error_dict = JSON.parse(result.error.message)[0]
            return res.status(400).json({
                error: error_dict.message,
                details: result.error.issues.map(e => ({
                    path: e.path.join('.'),
                    error: e.message
                }))
            })
        }

        const data = result.data;
        const regNormalized = normalizeReg(data.regNumber);

        // check to see if vehicle exists
        const vehicle = await Vehicle.findOne({regNormalized})
        if(vehicle != null){
            return res.status(409).json({ error: 'Vehicle already exists' });
        }

        // create new vehicle
        const doc = await Vehicle.create({
            ...data,
            regNormalized,
        });



        res.status(201).json({message: 'Vehicle succesfully created.'})

    } catch (error) {
        console.error('[POST /newVehicle]', error);
        if (error?.code === 11000 && (error?.keyPattern?.regNormalized || error?.keyValue?.regNormalized)) {
            return res.status(409).json({
            error: 'Conflict',
            errors: { regNumber: ['A vehicle with this registration already exists'] }
        });
  }
        return res.status(500).json({ error: 'Failed to create vehicle' });
    }
})

vehicleRouter.delete('/:reg', async (req, res) =>{
    try{
        const reg = req.params['reg'];
        const result = await Vehicle.deleteOne({regNumber: reg});
        res.status(204).json({message: result})
    }catch(error){
        console.error(error)
    }
})

vehicleRouter.get('/:reg', async (req, res) => {
    try {
        const reg = req.params['reg'];
        const result = await Vehicle.find({regNumber: reg});
        return res.status(200).json(result)
    } catch (error) {
        console.error(error)
    }
})

export default vehicleRouter;