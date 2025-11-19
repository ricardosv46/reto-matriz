import { validateMatrixInput } from "./matrixValidation";

/**
 * Tests con enfoque BDD (Behavior-Driven Development)
 * Describe comportamientos del usuario desde su perspectiva
 */
describe("validateMatrixInput - Validación de entrada de matriz", () => {
  describe("Cuando el usuario ingresa una matriz válida", () => {
    it("Debería aceptar una matriz 2x2 válida", () => {
      // Given: El usuario ingresa una matriz 2x2 válida
      const input = "[[1,2],[3,4]]";

      // When: Se valida la entrada
      const result = validateMatrixInput(input);

      // Then: Debería retornar válido con la matriz parseada
      expect(result.isValid).toBe(true);
      expect(result.matrix).toEqual([
        [1, 2],
        [3, 4],
      ]);
      expect(result.error).toBeUndefined();
    });

    it("Debería aceptar una matriz 3x3 válida", () => {
      // Given: El usuario ingresa una matriz 3x3 válida
      const input = "[[1,2,3],[4,5,6],[7,8,9]]";

      // When: Se valida la entrada
      const result = validateMatrixInput(input);

      // Then: Debería retornar válido
      expect(result.isValid).toBe(true);
      expect(result.matrix).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });

    it("Debería aceptar una matriz 1x1 válida", () => {
      // Given: El usuario ingresa una matriz 1x1
      const input = "[[5]]";

      // When: Se valida la entrada
      const result = validateMatrixInput(input);

      // Then: Debería retornar válido
      expect(result.isValid).toBe(true);
      expect(result.matrix).toEqual([[5]]);
    });
  });

  describe("Cuando el usuario ingresa datos inválidos", () => {
    it("Debería rechazar una entrada vacía", () => {
      // Given: El usuario no ingresa nada
      const input = "";

      // When: Se valida la entrada
      const result = validateMatrixInput(input);

      // Then: Debería retornar error indicando que debe ingresar una matriz
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Por favor ingresa una matriz");
      expect(result.matrix).toBeUndefined();
    });

    it("Debería rechazar JSON inválido", () => {
      // Given: El usuario ingresa texto que no es JSON válido
      const input = "esto no es json {[}";

      // When: Se valida la entrada
      const result = validateMatrixInput(input);

      // Then: Debería retornar error de formato JSON
      expect(result.isValid).toBe(false);
      expect(result.error).toContain("Formato JSON inválido");
    });

    it("Debería rechazar cuando no es un array", () => {
      // Given: El usuario ingresa un objeto en lugar de array
      const input = '{"key": "value"}';

      // When: Se valida la entrada
      const result = validateMatrixInput(input);

      // Then: Debería retornar error indicando que debe ser array
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("La entrada debe ser un array");
    });

    it("Debería rechazar cuando las filas no son arrays", () => {
      // Given: El usuario ingresa un array con elementos no-arrays
      const input = "[1,2,3]";

      // When: Se valida la entrada
      const result = validateMatrixInput(input);

      // Then: Debería retornar error indicando que cada fila debe ser array
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Cada fila debe ser un array");
    });

    it("Debería rechazar una matriz vacía", () => {
      // Given: El usuario ingresa un array vacío
      const input = "[]";

      // When: Se valida la entrada
      const result = validateMatrixInput(input);

      // Then: Debería retornar error indicando que no puede estar vacía
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("La matriz no puede estar vacía");
    });

    it("Debería rechazar filas vacías", () => {
      // Given: El usuario ingresa matriz con filas vacías
      const input = "[[],[],[]]";

      // When: Se valida la entrada
      const result = validateMatrixInput(input);

      // Then: Debería retornar error indicando que las filas no pueden estar vacías
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Las filas no pueden estar vacías");
    });

    it("Debería rechazar cuando las filas tienen diferentes longitudes", () => {
      // Given: El usuario ingresa una matriz no rectangular
      const input = "[[1,2],[3,4,5]]";

      // When: Se valida la entrada
      const result = validateMatrixInput(input);

      // Then: Debería retornar error indicando que todas las filas deben tener la misma longitud
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "Todas las filas deben tener la misma longitud"
      );
    });

    it("Debería rechazar cuando la matriz no es cuadrada", () => {
      // Given: El usuario ingresa una matriz rectangular (no cuadrada)
      const input = "[[1,2,3],[4,5,6]]";

      // When: Se valida la entrada
      const result = validateMatrixInput(input);

      // Then: Debería retornar error indicando que debe ser cuadrada
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("La matriz debe ser cuadrada (NxN)");
    });

    it("Debería rechazar cuando hay elementos que no son números", () => {
      // Given: El usuario ingresa una matriz con strings
      const input = '[["a","b"],["c","d"]]';

      // When: Se valida la entrada
      const result = validateMatrixInput(input);

      // Then: Debería retornar error indicando que todos deben ser números
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Todos los elementos deben ser números");
    });

    it("Debería rechazar cuando hay elementos null o undefined", () => {
      // Given: El usuario ingresa una matriz con null
      const input = "[[1,2],[null,4]]";

      // When: Se valida la entrada
      const result = validateMatrixInput(input);

      // Then: Debería retornar error indicando que todos deben ser números
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Todos los elementos deben ser números");
    });
  });
});
