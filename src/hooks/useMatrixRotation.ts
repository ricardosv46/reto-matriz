import { useState } from "react";
import { rotateMatrix } from "../utils/rotateMatrix";
import {
  validateMatrixInput,
  type ValidationResult,
} from "../utils/matrixValidation";

export interface RotationState {
  inputMatrix: number[][] | null;
  rotatedMatrix: number[][] | null;
  error: string;
  isLoading: boolean;
}

/**
 * Hook personalizado para manejar la rotación de matrices
 * Encapsula la lógica de validación, rotación y manejo de errores
 */
export function useMatrixRotation() {
  const [state, setState] = useState<RotationState>({
    inputMatrix: null,
    rotatedMatrix: null,
    error: "",
    isLoading: false,
  });

  const rotate = (input: string) => {
    setState((prev) => ({
      ...prev,
      error: "",
      rotatedMatrix: null,
      isLoading: true,
    }));

    try {
      const validation: ValidationResult = validateMatrixInput(input);

      if (!validation.isValid || !validation.matrix) {
        setState((prev) => ({
          ...prev,
          error: validation.error || "Error desconocido en la validación",
          isLoading: false,
        }));
        return;
      }

      const rotated = rotateMatrix(validation.matrix);

      setState({
        inputMatrix: validation.matrix,
        rotatedMatrix: rotated,
        error: "",
        isLoading: false,
      });
    } catch (e) {
      setState((prev) => ({
        ...prev,
        error:
          e instanceof Error
            ? e.message
            : "Error inesperado al procesar la matriz",
        isLoading: false,
      }));
    }
  };

  const reset = () => {
    setState({
      inputMatrix: null,
      rotatedMatrix: null,
      error: "",
      isLoading: false,
    });
  };

  return {
    ...state,
    rotate,
    reset,
  };
}
