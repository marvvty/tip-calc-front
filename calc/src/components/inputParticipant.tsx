import type { ParticipantDto } from "../types/types";

type Props = {
  index: number;
  participant: ParticipantDto;
  onChange: (
    index: number,
    field: keyof ParticipantDto,
    value: string | number
  ) => void;
  onRemove?: () => void;
};

export function ParticipantInput({
  index,
  participant,
  onChange,
  onRemove,
}: Props) {
  return (
    <div className="flex gap-2 items-center flex-col border border-gray-800 p-4 rounded-xl bg-black">
      <input
        type="text"
        placeholder="Name"
        value={participant.name}
        onChange={(e) => onChange(index, "name", e.target.value)}
        className="border border-indigo-600 bg-black text-white rounded-lg py-1 font-semibold cursor-pointer hover:border-indigo-800 p-1"
      />
      <input
        type="number"
        placeholder="Custom %"
        value={participant.custom_precent ?? ""}
        onChange={(e) => onChange(index, "custom_precent", e.target.value)}
        className="border border-indigo-600 bg-black text-white rounded-lg py-1 font-semibold cursor-pointer hover:border-indigo-800 p-1"
      />
      {onRemove && (
        <button
          onClick={onRemove}
          className="border border-indigo-600 bg-black text-white rounded-lg py-1 font-semibold cursor-pointer hover:border-indigo-800 w-30 hover:-translate-y-0.5 hover:scale-100 transition"
        >
          remove
        </button>
      )}
    </div>
  );
}
