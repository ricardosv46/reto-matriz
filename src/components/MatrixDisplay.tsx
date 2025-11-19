interface MatrixDisplayProps {
  matrix: number[][];
  title: string;
}

export const MatrixDisplay = ({ matrix, title }: MatrixDisplayProps) => (
  <div className="flex flex-col items-center" role="region" aria-label={title}>
    <h2 className="text-xl font-semibold mb-2 dark:text-white text-center">
      {title}
    </h2>
    <div
      className="inline-block border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
      role="grid"
      aria-label={`Matriz ${title}`}
    >
      {matrix.map((row, i) => (
        <div key={i} className="flex" role="row">
          {row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="w-12 h-12 flex items-center justify-center border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              role="cell"
              aria-label={`Celda ${i + 1},${j + 1}: ${cell}`}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
