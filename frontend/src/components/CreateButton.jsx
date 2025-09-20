import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import * as Dialog from "@radix-ui/react-dialog";

const CreateButton = ({onSuccess}) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      if (open) {
        setError(null);
        setSubmitting(false);
      }
    }, [open]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget
    setError(null);
    const payload = Object.fromEntries(new FormData(form));

    
    const API = import.meta.env.VITE_API_URL 
    try {
      setSubmitting(true);
      const res = await fetch(`${API}/api/v1/vehicles/newVehicle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.log(data);
        throw new Error(data?.message || data?.error || "Failed to save");
      }
      onSuccess();
      form?.reset();
      setOpen(false); // close on success
      
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="border text-lg px-4 py-2.5 rounded-xl bg-blue-500 text-white hover:shadow-sm transition duration-300">
          <FaPlus className="inline mb-1" />
          <span className="ml-2">Create new vehicle</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.45)] backdrop-blur-[3px]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-1/2 bg-white rounded-xl py-[42px] px-[34px] w-[700px] h-auto shadow-[0_10px_10px_rgba(0,0,0,0.2)">
          <Dialog.Title className="font-bold text-center text-2xl">
            Add vehicle
          </Dialog.Title>

          <Dialog.Description className="text-center text-gray-600">
            Fill the details and save.
          </Dialog.Description>

          <form
            noValidate
            onSubmit={onSubmit}
            style={{ display: "grid", gap: 10, marginTop: 24 }}
          >
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Registration */}
              <div className="space-y-1">
                <label
                  htmlFor="reg"
                  className="block text-sm font-medium text-gray-700"
                >
                  Registration
                </label>
                <input
                  id="reg"
                  name="reg"
                  type="text"
                  title="Please enter a valid UK registration."
                  required
                  placeholder="AB19 XYZ"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Make */}
              <div className="space-y-1">
                <label
                  htmlFor="make"
                  className="block text-sm font-medium text-gray-700"
                >
                  Make
                </label>
                <input
                  id="make"
                  name="make"
                  required
                  placeholder="Volkswagen"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Model */}
              <div className="space-y-1">
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700"
                >
                  Model
                </label>
                <input
                  id="model"
                  name="model"
                  required
                  placeholder="Golf TDI"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Lease Company */}
              <div className="space-y-1">
                <label
                  htmlFor="leaseCompany"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lease Company
                </label>
                <input
                  id="leaseCompany"
                  name="leaseCompany"
                  required
                  placeholder="LeasePlan UK"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Lease End Date */}
              <div className="space-y-1">
                <label
                  htmlFor="leaseEndDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lease End Date
                </label>
                <input
                  id="leaseEndDate"
                  name="leaseEndDate"
                  type="date"
                  required
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Current Location */}
              <div className="space-y-1">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Location
                </label>
                <input
                  id="location"
                  name="location"
                  placeholder="Leicester"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Last Valet */}
              <div className="space-y-1">
                <label
                  htmlFor="lastValet"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Valet
                </label>
                <input
                  id="lastValet"
                  name="lastValet"
                  type="date"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Mileage */}
              <div className="space-y-1">
                <label
                  htmlFor="mileage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mileage
                </label>
                <input
                  id="mileage"
                  name="mileage"
                  type="number"
                  min={0}
                  step={1}
                  required
                  placeholder="45200"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Fuel */}
              <div className="space-y-1">
                <label
                  htmlFor="fuel"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fuel (+Charge) %
                </label>
                <input
                  id="fuel"
                  name="fuel"
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  required
                  placeholder="50"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Powertrain */}
              <div className="space-y-1">
                <label
                  htmlFor="powertrain"
                  className="block text-sm font-medium text-gray-700"
                >
                  Powertrain
                </label>
                <select
                  id="powertrain"
                  name="powertrain"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue="diesel"
                  required
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>

              {/* Gearbox */}
              <div className="space-y-1">
                <label
                  htmlFor="gearbox"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gearbox
                </label>
                <select
                  id="gearbox"
                  name="gearbox"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue="manual"
                  required
                >
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>

            {error && <p style={{ color: "crimson" }}>{error}</p>}

            {/* Actions */}
            <div className="mt-2 flex justify-end gap-3">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </Dialog.Close>

              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                disabled={submitting}
              >
                {submitting ? "Saving…" : "Save"}
              </button>
            </div>
          </form>

          
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateButton;
