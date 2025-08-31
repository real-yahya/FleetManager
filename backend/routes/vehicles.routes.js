import { Router } from "express";
import Vehicle from "../models/Vehicle.model.js";

const vehicleRouter = Router();

vehicleRouter.get('/allVehicles', async (req,res) => {
    try {
        const vehicles = await Vehicle.find({}).lean({ virtuals: true });
        res.json(vehicles);
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
})

export default vehicleRouter;