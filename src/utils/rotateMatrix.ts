/**
 * Rota una matriz cuadrada 90 grados en sentido anti-horario.
 * 
 * Nota: Esta función asume que la matriz ya fue validada por validateMatrixInput.
 * Las validaciones aquí son defensivas en caso de uso directo de la función.
 *
 * @param input - Matriz cuadrada NxN ya validada
 * @returns Matriz rotada
 * @throws Error si la matriz no es cuadrada o está vacía
 */
export function rotateMatrix(input: number[][]): number[][] {
  // Validación defensiva: verificar que sea array
  // (matrixValidation ya valida esto, pero mantenemos para uso directo de la función)
  if (!Array.isArray(input)) {
    throw new Error("La matriz debe ser NxN");
  }

  const size = input.length;

  // Validación defensiva: matriz vacía
  if (size === 0) {
    throw new Error("La matriz debe ser NxN");
  }

  // Validación defensiva: verificar que sea cuadrada
  if (!input.every((row) => Array.isArray(row) && row.length === size)) {
    throw new Error("La matriz debe ser NxN");
  }

  const result = Array.from({ length: size }, () => Array(size).fill(0));

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const newValue = input[j][size - 1 - i];
      result[i][j] = newValue;
    }
  }

  return result;
}
