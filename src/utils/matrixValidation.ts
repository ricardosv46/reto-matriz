/**
 * Resultado de la validación de una matriz
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  matrix?: number[][];
}

/**
 * Valida que el input no esté vacío
 * @param input - Cadena de entrada
 * @returns Resultado de la validación o null si es válido
 */
function validateEmptyInput(input: string): ValidationResult | null {
  if (!input.trim()) {
    return {
      isValid: false,
      error: "Por favor ingresa una matriz",
    };
  }
  return null;
}

/**
 * Parsea y valida que sea JSON válido
 * @param input - Cadena JSON
 * @returns Matriz parseada o resultado de error
 */
function parseJsonInput(input: string): ValidationResult | { matrix: unknown } {
  try {
    const matrix = JSON.parse(input);
    return { matrix };
  } catch {
    return {
      isValid: false,
      error:
        "Formato JSON inválido. Asegúrate de que la matriz esté correctamente formateada",
    };
  }
}

/**
 * Valida que sea un array
 * @param value - Valor a validar
 * @returns Resultado de error o null si es válido
 */
function validateIsArray(value: unknown): ValidationResult | null {
  if (!Array.isArray(value)) {
    return {
      isValid: false,
      error: "La entrada debe ser un array",
    };
  }
  return null;
}

/**
 * Valida que cada fila sea un array
 * @param matrix - Matriz a validar
 * @returns Resultado de error o null si es válido
 */
function validateRowsAreArrays(matrix: unknown[]): ValidationResult | null {
  if (!matrix.every((row) => Array.isArray(row))) {
    return {
      isValid: false,
      error: "Cada fila debe ser un array",
    };
  }
  return null;
}

/**
 * Valida que la matriz no esté vacía
 * @param matrix - Matriz a validar
 * @returns Resultado de error o null si es válido
 */
function validateMatrixNotEmpty(matrix: unknown[][]): ValidationResult | null {
  if (matrix.length === 0) {
    return {
      isValid: false,
      error: "La matriz no puede estar vacía",
    };
  }
  return null;
}

/**
 * Valida que todas las filas tengan la misma longitud
 * @param matrix - Matriz a validar
 * @returns Longitud de fila o resultado de error
 */
function validateConsistentRowLength(
  matrix: unknown[][]
): ValidationResult | { rowLength: number } {
  const rowLength = matrix[0].length;

  if (rowLength === 0) {
    return {
      isValid: false,
      error: "Las filas no pueden estar vacías",
    };
  }

  if (!matrix.every((row) => row.length === rowLength)) {
    return {
      isValid: false,
      error: "Todas las filas deben tener la misma longitud",
    };
  }

  return { rowLength };
}

/**
 * Valida que la matriz sea cuadrada (NxN)
 * @param matrix - Matriz a validar
 * @param rowLength - Longitud de las filas
 * @returns Resultado de error o null si es válido
 */
function validateSquareMatrix(
  matrix: unknown[][],
  rowLength: number
): ValidationResult | null {
  if (matrix.length !== rowLength) {
    return {
      isValid: false,
      error: "La matriz debe ser cuadrada (NxN)",
    };
  }
  return null;
}

/**
 * Valida que todos los elementos sean números
 * @param matrix - Matriz a validar
 * @returns Matriz tipada o resultado de error
 */
function validateNumericElements(
  matrix: unknown[][]
): ValidationResult | { matrix: number[][] } {
  if (
    !matrix.every((row) =>
      row.every((cell: unknown) => typeof cell === "number")
    )
  ) {
    return {
      isValid: false,
      error: "Todos los elementos deben ser números",
    };
  }

  return { matrix: matrix as number[][] };
}

/**
 * Valida y parsea una cadena JSON que representa una matriz cuadrada NxN.
 * Sigue el principio SRP delegando cada validación a funciones específicas.
 *
 * @param input - Cadena JSON que representa la matriz
 * @returns Resultado de la validación con la matriz parseada o error
 */
export function validateMatrixInput(input: string): ValidationResult {
  const emptyError = validateEmptyInput(input);
  if (emptyError) return emptyError;

  const parseResult = parseJsonInput(input);
  if (!("matrix" in parseResult)) {
    return parseResult;
  }

  const arrayError = validateIsArray(parseResult.matrix);
  if (arrayError) return arrayError;

  const matrix = parseResult.matrix as unknown[];
  const rowsError = validateRowsAreArrays(matrix);
  if (rowsError) return rowsError;

  const typedMatrix = matrix as unknown[][];
  const notEmptyError = validateMatrixNotEmpty(typedMatrix);
  if (notEmptyError) return notEmptyError;

  const lengthResult = validateConsistentRowLength(typedMatrix);
  if (!("rowLength" in lengthResult)) {
    return lengthResult;
  }

  const squareError = validateSquareMatrix(typedMatrix, lengthResult.rowLength);
  if (squareError) return squareError;

  const numericResult = validateNumericElements(typedMatrix);
  if (!("matrix" in numericResult)) {
    return numericResult;
  }

  return {
    isValid: true,
    matrix: numericResult.matrix,
  };
}
