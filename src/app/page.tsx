"use client";

import { useState } from "react";
import { useMatrixRotation } from "../hooks";
import {
  MatrixInput,
  ErrorAlert,
  MatrixResult,
  Header,
  Footer,
} from "../components";

export default function Home() {
  const [input, setInput] = useState("");
  const { inputMatrix, rotatedMatrix, error, isLoading, rotate, reset } =
    useMatrixRotation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rotate(input);
  };

  const handleClear = () => {
    reset();
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <section className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <MatrixInput
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            onClear={handleClear}
            isLoading={isLoading}
          />

          {error && <ErrorAlert message={error} />}

          {inputMatrix && rotatedMatrix && (
            <MatrixResult
              inputMatrix={inputMatrix}
              rotatedMatrix={rotatedMatrix}
            />
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
