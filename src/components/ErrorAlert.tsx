interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert = ({ message }: ErrorAlertProps) => (
  <div
    className="mt-4 p-4 bg-red-50 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-200"
    role="alert"
    aria-live="polite"
  >
    <p>{message}</p>
  </div>
);
