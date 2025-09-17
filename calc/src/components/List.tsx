import type { ParticipantDto } from "../types/types";
import { ParticipantInput } from "./inputParticipant";

type Props = {
  participants: ParticipantDto[];
  onChange: (
    index: number,
    field: keyof ParticipantDto,
    value: string | number
  ) => void;
  onRemove: (index: number) => void;
};

export function ParticipantsList({ participants, onChange, onRemove }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="border-b border-gray-800 w-30  hover:-translate-y-1 hover:scale-100 transition">
        Participants
      </h3>
      {participants.map((p, index) => (
        <ParticipantInput
          key={index}
          index={index}
          participant={p}
          onChange={onChange}
          onRemove={participants.length > 1 ? () => onRemove(index) : undefined}
        />
      ))}
    </div>
  );
}
