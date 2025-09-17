import type {
  CreateCheckDto,
  CalculationResult,
  CreatedAccount,
} from "../types/types";
import { useState, useEffect } from "react";
import { ParticipantsList } from "./List";
import { CalculationResults } from "./calcResult";
import { FormInputs } from "./input";

type Props = {
  initialData: CreatedAccount | null;
  onReturn: () => void;
  onSubmit: (data: CreateCheckDto) => void;
  onCalculate?: () => Promise<any>;
};

export function AccountForm({
  initialData,
  onReturn,
  onSubmit,
  onCalculate,
}: Props) {
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

  useEffect(() => {
    if (initialData) {
      setForm({
        base_amount: Number(initialData.base_amount),
        tip_precent: initialData.tip_precent,
        people_count: initialData.people_count,
        participants: initialData.participants,
      });
    }
  }, [initialData]);

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
    setForm((prev) => {
      const newParticipants = [
        ...prev.participants,
        { name: "", custom_precent: undefined, custom_amount: undefined },
      ];
      return {
        ...prev,
        people_count: newParticipants.length,
        participants: newParticipants,
      };
    });
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
    await onSubmit(form);
  };

  const handleCalculate = async () => {
    if (!onCalculate) return;
    try {
      const result = await onCalculate();
      setCalculationResult(result);
    } catch (error) {
      console.error("Calculation failed:", error);
    }
  };

  return (
    <>
      <button
        className="border border-indigo-600 bg-black text-white rounded-lg py-1 cursor-pointer hover:border-indigo-800 hover:-translate-y-0.5 hover:scale-100 transition w-30"
        onClick={onReturn}
      >
        return
      </button>
      <div className="flex flex-row gap-4 ">
        <FormInputs
          form={form}
          onChange={handleChange}
          onAddParticipant={addParticipant}
          onSubmit={handleSubmit}
          onCalculate={handleCalculate}
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
    </>
  );
}
