import { MatrixDisplay } from "./MatrixDisplay";

interface MatrixResultProps {
  inputMatrix: number[][];
  rotatedMatrix: number[][];
}

export const MatrixResult = ({
  inputMatrix,
  rotatedMatrix,
}: MatrixResultProps) => {
  return (
    <section
      className="mt-6 flex flex-col md:flex-row justify-center items-start gap-8 flex-wrap"
      aria-label="Resultados de la rotación"
    >
      <MatrixDisplay matrix={inputMatrix} title="Matriz Original" />
      <MatrixDisplay
        matrix={rotatedMatrix}
        title="Matriz Rotada 90° Anti-horario"
      />
    </section>
  );
};
