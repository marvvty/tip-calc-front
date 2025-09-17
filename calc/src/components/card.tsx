import type { CreatedAccount } from "../types/types";

interface Props {
  check: CreatedAccount;
  onDelete: () => void;
  onEdit: () => void;
}

export function CheckCard({ check, onDelete, onEdit }: Props) {
  return (
    <>
      <div className="flex flex-col gap-3 w-50 border  border-gray-900 bg-black text-white rounded-xl font-semibold">
        <div className="border border-gray-600 rounded-xl p-2 flex flex-col gap-2">
          <p className="border-b border-gray-700">check #{check.id}</p>
          <p>check sum:{check.base_amount}</p>
          <p>Tip percent: {check.tip_precent}%</p>
          <div className="flex gap-2 justify-between">
            <button
              className="text-green-500 border border-indigo-600 bg-black rounded-lg py-1 font-semibold cursor-pointer hover:border-indigo-800 px-3"
              onClick={onEdit}
            >
              upd
            </button>
            <button
              className="text-red-500 border border-indigo-600 bg-black rounded-lg py-1 font-semibold cursor-pointer hover:border-indigo-800 px-3"
              onClick={onDelete}
            >
              x
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
