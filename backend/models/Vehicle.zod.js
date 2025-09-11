import * as z from "zod";

const REG_PLATE = /^[A-Z]{2}[0-9]{2}\s?[A-Z]{3}$/;

const emptyToUndef = (v) => (v === "" ? undefined : v);

const vehicleZod = z
  .object({
    regNumber: z
      .string()
      .regex(REG_PLATE, "Invalid UK registration number format")
      .transform((s) => s.toUpperCase().trim()),
    make: z
      .string()
      .min(2)
      .max(50)
      .transform((s) => s.toUpperCase().trim()),
    model: z
      .string()
      .min(1)
      .max(60)
      .transform((s) => s.toUpperCase().trim()),
    leaseCompany: z.string().trim().max(100),
    leaseEndDate: z.coerce.date(),
    location: z.string().trim().optional(),
    lastValet: z
      .preprocess(emptyToUndef, z.coerce.date())
      .refine(
        (d) => d instanceof Date && Number.isFinite(d.getTime()),
        "Invalid date"
      )
      .refine((d) => d <= new Date(), "Last valet must be in the past or today")
      .optional(),
    mileage: z.coerce
      .number()
      .min(0)
      .transform((v) => Math.max(0, Math.round(v))),
    fuel: z.coerce
      .number()
      .min(0)
      .max(100)
      .transform((v) => Math.round(Math.min(100, Math.max(0, v)))),
    powertrain: z
      .string()
      .transform((s) => s.trim().toLowerCase())
      .pipe(z.enum(["electric", "hybrid", "petrol", "diesel", "unknown"]))
      .default("unknown"),
    gearbox: z
      .string()
      .transform((s) => {
        const t = s.trim().toLowerCase();
        return t === "auto" ? "automatic" : t;
      })
      .pipe(z.enum(["automatic", "manual", "unknown"]))
      .default("unknown"),
  })
  .strict();

export default vehicleZod;