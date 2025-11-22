"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TokenComparison() {
  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [notes, setNotes] = useState("");
  const [comparisons, setComparisons] = useState<
    { id: number; tokenA: string; tokenB: string; notes: string }[]
  >([]);
  const [error, setError] = useState("");

  const addComparison = () => {
    if (!tokenA || !tokenB || !notes) {
      setError("Please fill in all fields before adding a comparison.");
      return;
    }
    const newComparison = {
      id: Date.now(),
      tokenA,
      tokenB,
      notes,
    };
    setComparisons((prev) => [...prev, newComparison]);
    setTokenA("");
    setTokenB("");
    setNotes("");
    setError("");
  };

  const deleteComparison = (id: number) => {
    setComparisons((prev) => prev.filter((c) => c.id !== id));
  };

  const clearAll = () => {
    setComparisons([]);
  };

  return (
    <div className="max-w-2xl w-full mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-center">Token Comparison Notes</h1>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Token A</label>
          <input
            type="text"
            value={tokenA}
            onChange={(e) => setTokenA(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter Token A name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Token B</label>
          <input
            type="text"
            value={tokenB}
            onChange={(e) => setTokenB(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter Token B name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Comparison Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border rounded px-3 py-2 w-full h-32 resize-y"
            placeholder="Write your observations here"
          />
        </div>

        {error && (
          <p className="text-red-600 font-medium">{error}</p>
        )}

        <Button onClick={addComparison} className="w-full">
          Add Comparison
        </Button>
      </div>

      {comparisons.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Saved Comparisons</h2>
            <Button variant="outline" onClick={clearAll}>
              Clear All
            </Button>
          </div>

          <ul className="space-y-3">
            {comparisons.map((c) => (
              <li
                key={c.id}
                className="border rounded p-3 flex flex-col gap-2 bg-muted/10"
              >
                <p>
                  <span className="font-medium">Token A:</span> {c.tokenA}
                </p>
                <p>
                  <span className="font-medium">Token B:</span> {c.tokenB}
                </p>
                <p>
                  <span className="font-medium">Notes:</span> {c.notes}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteComparison(c.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
