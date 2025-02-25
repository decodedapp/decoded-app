import { useLocaleContext } from "@/lib/contexts/locale-context";

export function UploadGuide() {
  const { t } = useLocaleContext();
  return (
    <div className="h-full bg-[#1A1A1A] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-[280px] mx-auto">
        <div className="mb-10 text-center">
          <svg
            className="w-12 h-12 text-gray-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm font-medium text-gray-400 mb-2">
            {t.request.steps.upload.title}
          </p>
          <p className="text-xs text-gray-500">
            {t.request.steps.upload.description}
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex items-start gap-3.5">
            <span className="w-5 h-5 rounded-full bg-[#EAFD66]/10 border border-[#EAFD66]/30 text-[#EAFD66] flex items-center justify-center text-xs flex-shrink-0 mt-1">
              !
            </span>
            <div className="space-y-1.5">
              <h3 className="text-xs font-medium text-gray-400">
                {t.request.steps.upload.guide.required.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.request.steps.upload.guide.required.description}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="w-5 h-5 rounded-full bg-gray-900 text-gray-400 flex items-center justify-center text-xs flex-shrink-0 mt-1">
              ?
            </span>
            <div className="space-y-1.5">
              <h3 className="text-xs font-medium text-gray-400">
                {t.request.steps.upload.guide.help.title}
              </h3>
              <ul className="text-xs space-y-1.5 text-gray-500">
                {t.request.steps.upload.guide.help.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
