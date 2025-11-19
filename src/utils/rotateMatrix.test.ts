import { rotateMatrix } from "./rotateMatrix";

/**
 * Tests con enfoque BDD (Behavior-Driven Development)
 * Describe comportamientos desde la perspectiva del usuario
 */
describe("rotateMatrix - Rotación de matriz anti-horaria 90 grados", () => {
  describe("Cuando se rota una matriz válida", () => {
    it("Debería rotar una matriz 2x2 correctamente", () => {
      // Given: Una matriz 2x2
      const input = [
        [1, 2],
        [3, 4],
      ];

      // When: Se rota la matriz 90° anti-horario
      const result = rotateMatrix(input);

      // Then: Debería retornar la matriz rotada correctamente
      // [[1,2],[3,4]] rotado anti-horario -> [[2,4],[1,3]]
      expect(result).toEqual([
        [2, 4],
        [1, 3],
      ]);
    });

    it("Debería rotar una matriz 3x3 correctamente", () => {
      // Given: Una matriz 3x3
      const input = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];

      // When: Se rota la matriz 90° anti-horario
      const result = rotateMatrix(input);

      // Then: Debería retornar la matriz rotada correctamente
      expect(result).toEqual([
        [3, 6, 9],
        [2, 5, 8],
        [1, 4, 7],
      ]);
    });

    it("Debería mantener una matriz 1x1 sin cambios", () => {
      // Given: Una matriz 1x1
      const input = [[5]];

      // When: Se rota la matriz
      const result = rotateMatrix(input);

      // Then: Debería retornar la misma matriz (rotación de 1x1 es idempotente)
      expect(result).toEqual([[5]]);
    });

    it("Debería rotar una matriz 4x4 correctamente", () => {
      // Given: Una matriz 4x4
      const input = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ];

      // When: Se rota la matriz 90° anti-horario
      const result = rotateMatrix(input);

      // Then: Debería retornar la matriz rotada correctamente
      expect(result).toEqual([
        [4, 8, 12, 16],
        [3, 7, 11, 15],
        [2, 6, 10, 14],
        [1, 5, 9, 13],
      ]);
    });
  });

  describe("Cuando se intenta rotar una matriz inválida", () => {
    it("Debería lanzar error si la matriz no es cuadrada", () => {
      // Given: Una matriz no cuadrada (2x3)
      const invalidMatrix = [
        [1, 2],
        [3, 4, 5],
      ];

      // When/Then: Debería lanzar error indicando que debe ser NxN
      expect(() => rotateMatrix(invalidMatrix)).toThrow(
        "La matriz debe ser NxN"
      );
    });

    it("Debería lanzar error si la entrada no es un array", () => {
      // Given: Una entrada que no es array
      const invalidInput = "no es una matriz" as unknown as number[][];

      // When/Then: Debería lanzar error
      expect(() => rotateMatrix(invalidInput)).toThrow(
        "La matriz debe ser NxN"
      );
    });

    it("Debería lanzar error si las filas tienen diferentes longitudes", () => {
      // Given: Una matriz con filas de diferentes longitudes
      const invalidMatrix = [[1, 2], [3]];

      // When/Then: Debería lanzar error
      expect(() => rotateMatrix(invalidMatrix)).toThrow(
        "La matriz debe ser NxN"
      );
    });

    it("Debería lanzar error si la matriz está vacía", () => {
      // Given: Una matriz vacía
      const emptyMatrix: number[][] = [];

      // When/Then: Debería lanzar error (ya que no puede determinar size)
      expect(() => rotateMatrix(emptyMatrix)).toThrow("La matriz debe ser NxN");
    });
  });
});
