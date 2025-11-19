import { renderHook, act } from "@testing-library/react";
import { useMatrixRotation } from "./useMatrixRotation";
import { rotateMatrix } from "../utils/rotateMatrix";
import { validateMatrixInput } from "../utils/matrixValidation";

// Mock de las dependencias
jest.mock("../utils/rotateMatrix");
jest.mock("../utils/matrixValidation");

const mockRotateMatrix = rotateMatrix as jest.MockedFunction<
  typeof rotateMatrix
>;
const mockValidateMatrixInput = validateMatrixInput as jest.MockedFunction<
  typeof validateMatrixInput
>;

describe("useMatrixRotation - Hook de rotación de matriz", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Cuando se inicializa el hook", () => {
    it("Debería tener estado inicial vacío", () => {
      // When: Se inicializa el hook
      const { result } = renderHook(() => useMatrixRotation());

      // Then: El estado inicial debería ser vacío
      expect(result.current.inputMatrix).toBeNull();
      expect(result.current.rotatedMatrix).toBeNull();
      expect(result.current.error).toBe("");
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("Cuando el usuario rota una matriz válida", () => {
    it("Debería rotar la matriz correctamente", () => {
      // Given: Una matriz válida y sus mocks
      const inputString = "[[1,2],[3,4]]";
      const parsedMatrix = [
        [1, 2],
        [3, 4],
      ];
      const rotatedMatrix = [
        [2, 4],
        [1, 3],
      ];

      mockValidateMatrixInput.mockReturnValue({
        isValid: true,
        matrix: parsedMatrix,
      });
      mockRotateMatrix.mockReturnValue(rotatedMatrix);

      const { result } = renderHook(() => useMatrixRotation());

      // When: El usuario rota una matriz válida
      act(() => {
        result.current.rotate(inputString);
      });

      // Then: Debería actualizar el estado con la matriz rotada
      expect(mockValidateMatrixInput).toHaveBeenCalledWith(inputString);
      expect(mockRotateMatrix).toHaveBeenCalledWith(parsedMatrix);
      expect(result.current.inputMatrix).toEqual(parsedMatrix);
      expect(result.current.rotatedMatrix).toEqual(rotatedMatrix);
      expect(result.current.error).toBe("");
      expect(result.current.isLoading).toBe(false);
    });

    it("Debería establecer isLoading en true durante el procesamiento", async () => {
      // Given: Una matriz válida
      const inputString = "[[1,2],[3,4]]";
      const parsedMatrix = [
        [1, 2],
        [3, 4],
      ];
      const rotatedMatrix = [
        [2, 4],
        [1, 3],
      ];

      mockValidateMatrixInput.mockReturnValue({
        isValid: true,
        matrix: parsedMatrix,
      });
      mockRotateMatrix.mockReturnValue(rotatedMatrix);

      const { result } = renderHook(() => useMatrixRotation());

      // When: Se inicia la rotación
      act(() => {
        result.current.rotate(inputString);
      });

      // Then: isLoading debería ser false después de completar
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("Cuando el usuario ingresa datos inválidos", () => {
    it("Debería manejar error de validación", () => {
      // Given: Una entrada inválida
      const inputString = "invalid";
      const errorMessage = "Formato JSON inválido";

      mockValidateMatrixInput.mockReturnValue({
        isValid: false,
        error: errorMessage,
      });

      const { result } = renderHook(() => useMatrixRotation());

      // When: El usuario intenta rotar con entrada inválida
      act(() => {
        result.current.rotate(inputString);
      });

      // Then: Debería mostrar el error y no rotar
      expect(result.current.error).toBe(errorMessage);
      expect(result.current.inputMatrix).toBeNull();
      expect(result.current.rotatedMatrix).toBeNull();
      expect(mockRotateMatrix).not.toHaveBeenCalled();
      expect(result.current.isLoading).toBe(false);
    });

    it("Debería limpiar el error previo cuando hay nueva entrada", () => {
      // Given: Un error previo y luego una entrada válida
      const invalidInput = "invalid";
      const validInput = "[[1,2],[3,4]]";

      mockValidateMatrixInput
        .mockReturnValueOnce({
          isValid: false,
          error: "Error previo",
        })
        .mockReturnValueOnce({
          isValid: true,
          matrix: [
            [1, 2],
            [3, 4],
          ],
        });

      mockRotateMatrix.mockReturnValue([
        [2, 4],
        [1, 3],
      ]);

      const { result } = renderHook(() => useMatrixRotation());

      // When: Primero falla y luego tiene éxito
      act(() => {
        result.current.rotate(invalidInput);
      });

      expect(result.current.error).toBe("Error previo");

      act(() => {
        result.current.rotate(validInput);
      });

      // Then: El error debería limpiarse
      expect(result.current.error).toBe("");
    });
  });

  describe("Cuando ocurre un error durante la rotación", () => {
    it("Debería capturar y mostrar el error", () => {
      // Given: Una validación exitosa pero rotación falla
      const inputString = "[[1,2],[3,4]]";
      const errorMessage = "Error en rotación";

      mockValidateMatrixInput.mockReturnValue({
        isValid: true,
        matrix: [
          [1, 2],
          [3, 4],
        ],
      });
      mockRotateMatrix.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const { result } = renderHook(() => useMatrixRotation());

      // When: Ocurre un error durante la rotación
      act(() => {
        result.current.rotate(inputString);
      });

      // Then: Debería mostrar el error
      expect(result.current.error).toBe(errorMessage);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("Cuando el usuario resetea el estado", () => {
    it("Debería limpiar todo el estado", () => {
      // Given: Un estado con datos
      const inputString = "[[1,2],[3,4]]";

      mockValidateMatrixInput.mockReturnValue({
        isValid: true,
        matrix: [
          [1, 2],
          [3, 4],
        ],
      });
      mockRotateMatrix.mockReturnValue([
        [2, 4],
        [1, 3],
      ]);

      const { result } = renderHook(() => useMatrixRotation());

      act(() => {
        result.current.rotate(inputString);
      });

      // When: El usuario resetea
      act(() => {
        result.current.reset();
      });

      // Then: Todo debería volver al estado inicial
      expect(result.current.inputMatrix).toBeNull();
      expect(result.current.rotatedMatrix).toBeNull();
      expect(result.current.error).toBe("");
      expect(result.current.isLoading).toBe(false);
    });
  });
});
