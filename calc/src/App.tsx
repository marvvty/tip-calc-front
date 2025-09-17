import "./App.css";
import { useEffect, useState } from "react";
import { AccountForm } from "./components/form";
import { CheckCard } from "./components/card";
import type { CreateCheckDto, CreatedAccount } from "./types/types";
import {
  calculateItem,
  create,
  deleteItem,
  getAll,
  update,
} from "./api/requests";

function App() {
  const [checks, setChecks] = useState<CreatedAccount[]>([]);
  const [selectedCheck, setSelectedCheck] = useState<CreatedAccount | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
  const [showCards, setShowCards] = useState(true);

  useEffect(() => {
    loadChecks();
  }, []);

  async function loadChecks() {
    const all = await getAll();
    setChecks(all);
  }

  async function handleCreate(data: CreateCheckDto) {
    const cleanData = {
      ...data,
      participants: data.participants.map(
        ({ name, custom_precent, custom_amount }) => ({
          name,
          custom_precent,
          custom_amount,
        })
      ),
    };

    const newCheck = await create(cleanData);

    setChecks([...checks, newCheck]);

    setSelectedCheck(newCheck);
  }

  async function handleUpdate(data: CreateCheckDto, checkId: number) {
    const cleanData = {
      ...data,
      participants: data.participants.map(
        ({ name, custom_precent, custom_amount }) => ({
          name,
          custom_precent,
          custom_amount,
        })
      ),
    };

    const updatedCheck = await update(checkId.toString(), cleanData);
    setChecks(
      checks.map((check) => (check.id === checkId ? updatedCheck : check))
    );

    setSelectedCheck(updatedCheck);
  }

  async function handleDelete(id: number) {
    await deleteItem(id.toString());
    setChecks(checks.filter((check) => check.id !== id));
  }

  function handleEdit(check: CreatedAccount) {
    setSelectedCheck(check);
    setShowForm(true);
    setShowCards(false);
  }

  function handleReturn() {
    setSelectedCheck(null);
    setShowForm(false);
    setShowCards(true);
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-3">
        {showCards && (
          <>
            {checks.map((check) => (
              <CheckCard
                key={check.id}
                check={check}
                onDelete={() => handleDelete(check.id)}
                onEdit={() => handleEdit(check)}
              />
            ))}

            <button
              onClick={() => {
                setSelectedCheck(null);
                setShowForm(true);
                setShowCards(false);
              }}
              className="border border-indigo-600 bg-black text-white rounded-lg py-1 cursor-pointer hover:border-indigo-800 hover:-translate-y-0.5 hover:scale-100 transition"
            >
              create new check
            </button>
          </>
        )}

        {showForm && (
          <AccountForm
            initialData={selectedCheck}
            onReturn={handleReturn}
            onSubmit={
              selectedCheck
                ? (data: CreateCheckDto) => handleUpdate(data, selectedCheck.id)
                : handleCreate
            }
            onCalculate={
              selectedCheck
                ? () => calculateItem(selectedCheck.id.toString())
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}

export default App;
