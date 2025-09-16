import type { CreateCheckDto, CalculationResult } from "../types/types";
import { useState } from "react";
import { calculateItem, create } from "../api/requests";
import { ParticipantsList } from "./List";
import { CalculationResults } from "./calcResult";
import { FormInputs } from "./input";

export function AccountForm() {
  const [form, setForm] = useState<CreateCheckDto>({
    base_amount: 100,
    tip_precent: 5,
    people_count: 1,
    participants: [
      { name: "", custom_precent: undefined, custom_amount: undefined },
    ],
  });
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);

  const handleParticipantChange = (
    index: number,
    field: keyof (typeof form.participants)[0],
    value: string | number
  ) => {
    const updated = [...form.participants];
    const val = field === "name" ? value : Number(value) || undefined;
    updated[index] = { ...updated[index], [field]: val };
    setForm({ ...form, participants: updated });
  };

  const addParticipant = () => {
    setForm((prev) => ({
      ...prev,
      people_count: prev.people_count + 1,
      participants: [...prev.participants, { name: "" }],
    }));
  };

  const removeParticipant = (index: number) => {
    const updated = form.participants.filter((_, i) => i !== index);
    setForm({
      ...form,
      participants: updated,
      people_count: updated.length,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "base_amount" ||
        name === "tip_precent" ||
        name === "people_count"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = await create(form);
    const calculation = await calculateItem(check.id.toString());
    setCalculationResult(calculation);

    setForm({
      base_amount: 0,
      tip_precent: 0,
      people_count: 1,
      participants: [
        { name: "", custom_precent: undefined, custom_amount: undefined },
      ],
    });
  };

  return (
    <div className="flex flex-row gap-4">
      <FormInputs
        form={form}
        onChange={handleChange}
        onAddParticipant={addParticipant}
        onSubmit={handleSubmit}
      />
      <ParticipantsList
        participants={form.participants}
        onChange={handleParticipantChange}
        onRemove={removeParticipant}
      />
      {calculationResult && (
        <CalculationResults calculationResult={calculationResult} />
      )}
    </div>
  );
}
