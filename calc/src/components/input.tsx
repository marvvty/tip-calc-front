import type { CreateCheckDto } from "../types/types";

type Props = {
  form: CreateCheckDto;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onAddParticipant: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function FormInputs({
  form,
  onChange,
  onAddParticipant,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-1 border border-gray-500 p-5 rounded-xl h-70"
    >
      <h2>Create check</h2>
      <label>base amount</label>
      <input
        type="number"
        name="base_amount"
        value={form.base_amount}
        onChange={onChange}
        className="border rounded-xl border-gray-700 p-1"
      />

      <label>tip</label>
      <select
        name="tip_precent"
        value={form.tip_precent}
        onChange={onChange}
        className="border rounded-xl border-gray-700 p-1"
      >
        <option value={5}>5%</option>
        <option value={10}>10%</option>
        <option value={15}>15%</option>
      </select>
      <button type="button" onClick={onAddParticipant}>
        add Participants
      </button>
      <button type="submit">submit</button>
    </form>
  );
}
