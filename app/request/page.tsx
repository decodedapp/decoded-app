"use client";

import { networkManager } from "@/lib/network/network";
import { arrayBufferToBase64 } from "@/lib/utils/string/format";
import React, { useState, useEffect } from "react";
import { Point, RequestedItem, RequestImage } from "@/types/model.d";
import { StepIndicator } from "./components/indicator/step-indicator";
import {
  NavigationButtons,
  PrevButton,
  NextButton,
} from "./components/navigation/buttons";
import { Step1 } from "./components/steps/step1";
import { Step2 } from "./components/steps/step2";

export default function RequestSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  // State of navigation
  const [isStepComplete, setIsStepComplete] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // State of step2
  const [imageFile, setImageFile] = useState<File | null>(null);
  // State of step3
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    switch (currentStep) {
      case 1:
        setIsStepComplete(!!selectedImage);
        break;
      case 2:
        setIsStepComplete(points.length > 0);
        break;
      default:
        setIsStepComplete(false);
    }
  }, [currentStep, selectedImage, points]);

  const defaultState = () => {
    setCurrentStep(1);
    setSelectedImage(null);
    setImageFile(null);
    setPoints([]);
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert("Please select a celebrity and upload an image");
      return;
    }
    const items: RequestedItem[] = [];
    for (const point of points) {
      items.push({
        imageId: "temp-id",
        position: {
          top: point.y.toString(),
          left: point.x.toString(),
        },
        originalPosition: {
          top: point.y.toString(),
          left: point.x.toString(),
        },
        context: point.context,
      });
    }
    const buffer = await imageFile?.arrayBuffer();
    const base64Image = arrayBufferToBase64(buffer);
    const requestBy = window.sessionStorage.getItem("USER_DOC_ID");
    if (!requestBy) {
      alert("로그인이 필요합니다.");
      return;
    }
    const requestImage: RequestImage = {
      requestedItems: items,
      requestBy: requestBy,
      imageFile: base64Image,
      metadata: {},
    };
    console.log("=== Sending Image Request ===");
    console.log("Request data:", {
      items: items,
      requestBy: requestBy,
      hasImage: !!base64Image,
      metadata: {},
    });
    networkManager
      .request("request/image", "POST", requestImage)
      .then((response) => {
        console.log("Request successful:", response);
        alert("요청이 완료되었습니다.");
        defaultState();
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.description || "요청 중 오류가 발생했습니다.";
        console.error("Request failed:", {
          error: errorMessage,
          details: error.response?.data,
        });
        alert(errorMessage);
      });
  };

  const onNext = () => setCurrentStep((prev) => prev + 1);
  const onPrev = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="pt-20 min-h-[calc(100vh-5rem)] bg-black">
      <div className="max-w-4xl mx-auto relative">
        <div className="p-6 pb-24">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
          <div className="mt-4">
            {currentStep === 1 && (
              <Step1
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                setImageFile={setImageFile}
              />
            )}
            {currentStep === 2 && (
              <Step2
                selectedImage={selectedImage}
                points={points}
                setPoints={setPoints}
              />
            )}
          </div>
        </div>

        <div className="sticky bottom-0">
          <div className="bg-black/90 backdrop-blur-md border-t border-gray-900 mx-6 rounded-t-lg">
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
                    onClick={handleSubmit}
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
                    완료
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
