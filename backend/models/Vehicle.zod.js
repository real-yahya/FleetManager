import * as z from "zod";

const REG_PLATE = /^[A-Z0-9 -]{1,8}$/i;

const vehicleZod = z.object({
    regNumber: z.string().trim().regex(REG_PLATE, 'Invalid registration format'),
    make: z.string().trim().min(2).max(50),
    model: z.string().trim().min(1).max(60),
    leaseCompany: z.string().trim(),
    leaseEndDate: z.coerce.date(),
    location: z.string().trim().optional(),
    lastValet: z.union([z.coerce.date(), z.null()]).optional()
             .refine(v => v == null || v <= new Date(), 'lastValet cannot be in the future'),
    mileage: z.coerce.number().int().min(0),
    fuel: z.coerce.number().int().min(0).max(100),
    powertrain: z.string().transform(s => s.trim().toLowerCase())
               .pipe(z.enum(['electric','hybrid','petrol','diesel','unknown'])),
    gearbox: z.string().transform(s => {
    const t = s.trim().toLowerCase();
    return t === 'auto' ? 'automatic' : t;
    }).pipe(z.enum(['automatic','manual','unknown']))
}).strict()

export default vehicleZod;