import type { CreateCheckDto } from "../types/types";

type Props = {
  form: CreateCheckDto;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onAddParticipant: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onCalculate: () => Promise<any>;
};

export function FormInputs({
  form,
  onChange,
  onAddParticipant,
  onSubmit,
  onCalculate,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 border  border-gray-800 bg-black text-white rounded-xl py-1 font-semibold h-84 p-4"
    >
      <h2>Create check</h2>
      <label>base amount</label>
      <input
        type="number"
        name="base_amount"
        value={form.base_amount}
        onChange={onChange}
        className="border rounded-xl border-indigo-600 p-2"
      />

      <label>tip</label>
      <select
        name="tip_precent"
        value={form.tip_precent}
        onChange={onChange}
        className="border rounded-xl border-indigo-600 p-2"
      >
        <option value={5}>5%</option>
        <option value={10}>10%</option>
        <option value={15}>15%</option>
      </select>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="border border-indigo-600 bg-black text-white rounded-lg py-1 font-semibold cursor-pointer hover:border-indigo-800 hover:-translate-y-0.5 hover:scale-100 transition"
          onClick={onAddParticipant}
        >
          add Participants
        </button>
        <button
          type="button"
          onClick={onCalculate}
          onSubmit={onSubmit}
          className="border border-indigo-600 bg-black text-white rounded-lg py-1 font-semibold cursor-pointer hover:border-indigo-800 hover:-translate-y-0.5 hover:scale-100 transition"
        >
          calculate
        </button>
        <button
          type="submit"
          className="border border-indigo-600 bg-black text-white rounded-lg py-1 font-semibold cursor-pointer hover:border-indigo-800 hover:-translate-y-0.5 hover:scale-100 transition"
        >
          submit
        </button>
      </div>
    </form>
  );
}
