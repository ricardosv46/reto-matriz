import { MATRIX_INPUT_PLACEHOLDER } from "../utils/constants";

interface MatrixInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear?: () => void;
  isLoading?: boolean;
}

export const MatrixInput = ({
  value,
  onChange,
  onSubmit,
  onClear,
  isLoading = false,
}: MatrixInputProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
      role="form"
      aria-label="Formulario de rotación de matriz"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="matrix-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Ingresa la matriz (formato JSON)
          </label>
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                onClear?.();
              }}
              disabled={isLoading}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Limpiar matriz"
            >
              Limpiar
            </button>
          )}
        </div>
        <textarea
          id="matrix-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={MATRIX_INPUT_PLACEHOLDER}
          rows={4}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm"
          aria-describedby="matrix-help"
          disabled={isLoading}
        />
        <p
          id="matrix-help"
          className="mt-1 text-sm text-gray-500 dark:text-gray-400"
        >
          Ingresa una matriz cuadrada en formato JSON. Cada fila debe tener la
          misma cantidad de elementos.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Rotar matriz"
      >
        {isLoading ? "Procesando..." : "Rotar Matriz"}
      </button>
    </form>
  );
};
