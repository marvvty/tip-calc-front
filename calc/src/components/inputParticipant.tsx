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
    <div className="flex gap-2 items-center flex-col border border-gray-500 p-4 rounded-xl">
      <input
        type="text"
        placeholder="Name"
        value={participant.name}
        onChange={(e) => onChange(index, "name", e.target.value)}
        className="border rounded-xl border-gray-700 p-1"
      />
      <input
        type="number"
        placeholder="Custom %"
        value={participant.custom_precent ?? ""}
        onChange={(e) => onChange(index, "custom_precent", e.target.value)}
        className="border rounded-xl border-gray-700 p-1"
      />
      <input
        type="number"
        placeholder="Custom amount"
        value={participant.custom_amount ?? ""}
        onChange={(e) => onChange(index, "custom_amount", e.target.value)}
        className="border rounded-xl border-gray-700 p-1"
      />
      {onRemove && (
        <button onClick={onRemove} className="font-bold px-2">
          remove
        </button>
      )}
    </div>
  );
}
