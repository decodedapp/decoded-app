"use client";
import { useState } from "react";
import { MainImage } from "@/types/model";
import Link from "next/link";
import Image from "next/image";
import {
  bold_font,
  medium_font,
  semi_bold_font,
} from "@/components/helpers/util";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function Pin({ image, shouldOpen }: { image: MainImage; shouldOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(shouldOpen);

  return (
    <div className="flex flex-col w-full rounded-lg border border-white/10">
      <Link
        href={`images?imageId=${image.docId}&imageUrl=${encodeURIComponent(
          image.imageUrl
        )}`}
        className="relative overflow-hidden aspect-w-3 aspect-h-4"
      >
        <Image
          src={image.imageUrl ?? ""}
          alt={image.title ?? ""}
          fill={true}
          style={{
            objectFit: "cover",
          }}
          className="rounded-lg"
        />
      </Link>
      <div className="flex flex-row justify-between items-center p-4 border-b border-white/10">
        <div className={`${bold_font.className}`}>
          {image.artistInfoList?.map((artist, index) => {
            return (
              <div className="pb-1 justify-between text-xs" key={index}>
                <Link
                  href={`/artists?name=${artist.name}`}
                  className="flex flex-row items-center hover:underline "
                >
                  {artist.name.toUpperCase()}
                </Link>
              </div>
            );
          })}
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          <ArrowRightIcon
            className={`w-5 h-5 transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>
      {isOpen && (
        <div
          className={`flex flex-col w-full ${bold_font.className} max-h-72 overflow-y-auto`}
        >
          {Array.from(image.itemInfoList.entries()).map(
            ([item, [pos, brand]], index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row w-full p-4 border-b border-white/10 items-center"
                >
                  <div className="w-20 h-16 relative">
                    <Image
                      src={item.imageUrl ?? ""}
                      alt={item.name}
                      fill={true}
                      style={{ objectFit: "cover" }}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col w-full ml-4 overflow-clip">
                    <div className="text-sm">
                      {brand[0]?.name.replace(/_/g, " ").toUpperCase()}
                    </div>
                    <div
                      className={`flex flex-row text-xs ${medium_font.className} w-full justify-between`}
                    >
                      {item.name}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default Pin;
