import React from "react";

export function Footer() {
  return (
    <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>
        Ingresa una matriz cuadrada en formato JSON para ver la rotación
        anti-horaria de 90 grados
      </p>
      <p className="mt-1">
        Ejemplo de entrada: [[1,2],[3,4]] - Resultado: [[2,4],[1,3]]
      </p>
    </footer>
  );
}

export default Footer;
