"use client";

import { useState } from "react";
import { useMatrixRotation } from "../hooks";
import { MatrixInput, ErrorAlert, MatrixResult } from "../components";

export default function Home() {
  const [input, setInput] = useState("");
  const { inputMatrix, rotatedMatrix, error, isLoading, rotate } =
    useMatrixRotation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rotate(input);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header>
          <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">
            Rotador de Matrices NxN 90°
          </h1>
        </header>

        <section className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <MatrixInput
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
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

        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Ingresa una matriz cuadrada en formato JSON para ver la rotación
            anti-horaria de 90 grados
          </p>
          <p className="mt-1">
            Ejemplo de entrada: [[1,2],[3,4]] - Resultado: [[2,4],[1,3]]
          </p>
        </footer>
      </div>
    </main>
  );
}
