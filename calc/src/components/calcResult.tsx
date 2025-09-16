import type { CalculationResult } from "../types/types";

type Props = {
  calculationResult: CalculationResult;
};

export function CalculationResults({ calculationResult }: Props) {
  return (
    <div className="flex flex-col gap-2 border border-gray-500 p-5 rounded-xl min-w-64">
      <h3 className="font-bold">Calculation Results</h3>

      <div className="pb-2">
        <p>
          <strong>Tip Amount:</strong> {calculationResult.tipAmount.toFixed(2)}
        </p>
        <p>
          <strong>Total Amount:</strong> {calculationResult.total.toFixed(2)}
        </p>
      </div>

      <div>
        {calculationResult.participants.map((item, index) => (
          <div key={item.participant.id} className="p-2 rounded">
            <p>
              <strong>{item.participant.name || `Person ${index + 1}`}</strong>
            </p>
            <p>Amount to pay: {item.calculated_share.toFixed(2)}</p>
            {item.participant.custom_precent && (
              <p>Custom tip: {item.participant.custom_precent}%</p>
            )}
            {item.participant.custom_amount && (
              <p>Custom amount: {item.participant.custom_amount.toFixed(2)}</p>
            )}
          </div>
        ))}
      </div>

      <div className="pt-2 mt-2">
        <p className="text-sm">
          <strong>Total calculated:</strong>
          {calculationResult.participants
            .reduce((sum, item) => sum + item.calculated_share, 0)
            .toFixed(2)}
        </p>
      </div>
    </div>
  );
}
