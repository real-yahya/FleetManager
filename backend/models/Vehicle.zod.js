import * as z from "zod";

const REG_PLATE = /^[A-Za-z]{2}[0-9]{2}\s?[A-Za-z]{3}$/;

const emptyToUndef = (v) => (v === "" || v == null ? undefined : v);

const vehicleZod = z
  .object({
    regNumber: z
      .string()
      .regex(REG_PLATE, "Invalid UK registration number format")
      .transform((s) => s.toUpperCase().trim()),
    make: z
      .string()
      .min(2, "Make should be more than 2 characters")
      .max(50, "Make should be less than 50 characters")
      .transform((s) => s.toUpperCase().trim()),
    model: z
      .string()
      .min(1, "Model should be more than 2 characters")
      .max(60, "Model should be less than 60 characters")
      .transform((s) => s.toUpperCase().trim()),
    leaseCompany: z
    .string()
    .trim()
    .min(3, "Lease company should be more than 3 characters")
    .max(100, "Lease company should be less than 100 characters"),
    leaseEndDate: z.preprocess(
        emptyToUndef,
        z.coerce.date({required_error:"Lease end date is required",invalid_type_error: "Enter a valid date",})
        .refine((d) => Number.isFinite(d.getTime()),
        "Value entered is not a valid date"
      )
    ),
    location: z.string().trim().optional(),
    lastValet: z
      .preprocess(emptyToUndef, z.coerce.date() 
      .refine(
        (d) => Number.isFinite(d.getTime()),
        "Value entered is not a valid date"
      )
      .refine((d) => d <= new Date(), "Last valet date cannot be in the future")
      .optional()
    ),
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