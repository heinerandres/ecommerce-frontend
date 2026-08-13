"use client";

export enum Step {
  direccion = 1,
  verificarOrden = 2,
  generarPedido = 3,
  pago = 4,
  entrega = 5,
}

interface StepProgressProps {
  currentStep: Step;
}

const steps = [
  {
    step: Step.direccion,
    label: "Dirección",
  },
  {
    step: Step.verificarOrden,
    label: "Verificar orden",
  },
  {
    step: Step.generarPedido,
    label: "Generar pedido",
  },
  {
    step: Step.pago,
    label: "Pago",
  },
  {
    step: Step.entrega,
    label: "Entrega",
  },
];

export default function StepProgress({
  currentStep,
}: StepProgressProps) {
  console.log(currentStep);
  return (
    <div className="flex w-full items-center">
      {steps.map((item, index) => {
        const completed = item.step <= currentStep;

        return (
          <div
            key={item.step}
            className="flex flex-1 items-center"
          >
            {/* Step */}
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  completed
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {item.step}
              </div>

              <span
                className={`whitespace-nowrap text-xs font-semibold ${
                  completed
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </div>

            {/* Línea */}
            {index < steps.length - 1 && (
              <div
                className={`mx-4 h-px flex-1 ${
                  item.step < currentStep
                    ? "bg-blue-600"
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}