import { useLocaleContext } from "@/lib/contexts/locale-context";

interface NavigationButtonProps {
  currentStep: number;
  totalSteps: number;
  isStepComplete: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
}

export function NextButton({
  isStepComplete,
  onNext,
}: {
  isStepComplete: boolean;
  onNext: () => void;
}) {
  const { t } = useLocaleContext();
  return (
    <button
      onClick={onNext}
      disabled={!isStepComplete}
      className={`
        px-8 py-3 rounded-xl text-sm font-medium
        transition-all duration-200 
        ${
          isStepComplete
            ? "bg-gradient-to-r from-[#EAFD66] to-[#EAFD66]/80 text-black hover:opacity-90"
            : "bg-gray-900/50 text-gray-600 cursor-not-allowed"
        }
      `}
    >
      {t.common.actions.next}
    </button>
  );
}

export function PrevButton({ onPrev }: { onPrev: () => void }) {
  const { t } = useLocaleContext();
  return (
    <button
      onClick={onPrev}
      className="px-8 py-3 rounded-xl text-sm font-medium 
        text-gray-300 hover:text-white/80 transition-colors"
    >
      {t.common.actions.prev}
    </button>
  );
}

export function NavigationButtons({
  currentStep,
  totalSteps,
  isStepComplete,
  onNext,
  onPrev,
  onSubmit,
}: NavigationButtonProps) {
  const { t } = useLocaleContext();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90">
      <div className="max-w-4xl mx-auto">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex-1">
            {currentStep > 1 && <PrevButton onPrev={onPrev} />}
          </div>
          <div className="flex-1 text-center text-sm text-gray-500">
            {currentStep} / {totalSteps}
          </div>
          <div className="flex-1 flex justify-end">
            {currentStep < totalSteps && (
              <NextButton isStepComplete={isStepComplete} onNext={onNext} />
            )}
            {currentStep === totalSteps && (
              <button
                onClick={onSubmit}
                disabled={!isStepComplete}
                className={`
                  px-6 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${
                    isStepComplete
                      ? "bg-[#EAFD66] text-black hover:bg-[#EAFD66]/90"
                      : "bg-gray-900 text-gray-600 border border-gray-800 cursor-not-allowed"
                  }
                `}
              >
                {t.common.actions.submit}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
