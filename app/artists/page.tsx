"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  pretendardBold,
  pretendardRegular,
  pretendardSemiBold,
} from "@/lib/constants/fonts";
import { LoadingView } from "@/components/ui/Loading";
import { FirebaseHelper } from "@/common/firebase";
import { useSearchParams, notFound } from "next/navigation";
import Link from "next/link";
import {
  ArtistInfo,
  BrandInfo,
  ArticleInfo,
  ArtistPageState,
} from "@/types/model";
import { sha256 } from "js-sha256";

function ArtistPage() {
  const searchParams = useSearchParams();
  const [artistName] = useState<string>(searchParams.get("name") ?? "");

  if (!artistName) {
    notFound();
  }
  // Artist page state
  let [artistPageState, setArtistPageState] = useState<ArtistPageState | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const artistDocId = sha256(artistName);
      const artist = (
        await FirebaseHelper.doc("artists", artistDocId)
      ).data() as ArtistInfo;
      let brandList: string[] = [];
      const brandLogo: Map<string, string> = new Map();
      let artistList: string[] = [];
      let artistArticleList: ArticleInfo[] = [];
      let artistImgList: [string, string][] = [];

      // Image artist tags
      const imgArtistTags = artist.tags?.images;
      const brandTags = artist.tags?.brands;
      brandList = Array.from(new Set(artist.tags?.brands || []));

      if (brandTags) {
        const brandInfoList = await Promise.all(
          brandTags.map(async (brandDocId) => {
            return (
              await FirebaseHelper.doc("brands", brandDocId)
            ).data() as BrandInfo;
          })
        );
        brandInfoList.map((brand) => {
          brandLogo.set(brand.name ?? "", brand.logoImageUrl ?? "");
        });
      }
      // Update image related artist stuff if any
      if (imgArtistTags) {
        const artistArticleDocIdList = artist.tags?.articles;
        const artistImgDocIdList = artist.tags?.images;
        if (artistArticleDocIdList) {
          const articles = await Promise.all(
            artistArticleDocIdList.map(async (articleDocId) => {
              return (
                await FirebaseHelper.doc("articles", articleDocId)
              ).data() as ArticleInfo;
            })
          );
          artistArticleList = articles;
        }
        if (artistImgDocIdList) {
          const images = await FirebaseHelper.listAllStorageItems("images");
          // Since item_doc_id is stored as custom metadata, logic is a bit complicated.
          // After changing item_doc_id as file name, it would be simpler
          await Promise.all(
            images.items.map(async (image) => {
              const metadata = await FirebaseHelper.metadata(image);
              const docId = metadata?.customMetadata?.id;
              if (docId && artistImgDocIdList.includes(docId)) {
                const imageUrl = await FirebaseHelper.downloadUrl(image);
                artistImgList.push([docId, imageUrl]);
              }
            })
          );
        }
        setArtistPageState({
          artist: artist,
          brandList: brandList,
          brandImgList: brandLogo,
          artistImgList: artistImgList,
          artistArticleList: artistArticleList,
        });
      }
    };
    fetchData();
  }, [artistName]);

  return artistPageState ? (
    <div className="flex-col justify-center text-center items-center min-h-screen">
      <MoreToExploreView artistPageState={artistPageState} />
      <ArtistArticleView artistPageState={artistPageState} />
    </div>
  ) : (
    <LoadingView />
  );
}

function MoreToExploreView({
  artistPageState,
}: {
  artistPageState: ArtistPageState;
}) {
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(
    null
  );
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md 브레이크포인트
        setItemsPerPage(3);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize(); // 초기 설정
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const totalPages = Math.ceil(
    (artistPageState.artistImgList?.length || 0) / itemsPerPage
  );
  const currentItems = artistPageState.artistImgList?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full text-center mt-40">
      {artistPageState.artistImgList &&
        artistPageState.artistImgList.length > 0 && (
          <div className="items-center justify-center">
            <div className="flex flex-col items-center mb-6 mt-16 md:mt-32 px-4 md:px-20">
              {artistPageState.artist?.profileImgUrl && (
                <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden">
                  <Image
                    src={artistPageState.artist.profileImgUrl}
                    alt={`${artistPageState.artist?.name} profile`}
                    fill={true}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div className="flex flex-col text-left px-4 md:px-10 mt-8">
                <a
                  className={`${pretendardBold.className} text-2xl mb-2 hover:underline`}
                  href={
                    artistPageState.artist?.sns?.instagram ??
                    artistPageState.artist?.sns?.youtube
                  }
                >
                  {artistPageState.artist?.name.toUpperCase()}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-stretch place-items-stretch my-20 px-20">
              {currentItems?.map((image, index) => (
                <Link
                  key={index}
                  href={`/images?imageId=${
                    image[0]
                  }&imageUrl=${encodeURIComponent(image[1])}`}
                  prefetch={true}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full h-[300px] md:h-[600px] aspect-w-3 aspect-h-4"
                  onMouseOver={() => setHoveredImageIndex(index)}
                  onMouseOut={() => setHoveredImageIndex(null)}
                >
                  <Image
                    src={image[1]}
                    alt="Artist Image"
                    fill={true}
                    style={{ objectFit: "cover" }}
                    className="more-tagged rounded-md"
                  />
                  {hoveredImageIndex === index && (
                    <div className="absolute inset-0 bg-[#101011] bg-opacity-50 flex items-center justify-center">
                      <p
                        className={`${pretendardRegular.className} px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors text-sm md:text-md`}
                      >
                        아이템 둘러보기
                      </p>
                    </div>
                  )}
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                      }}
                      className={`text-md md:text-lg px-3 py-1 rounded ${
                        currentPage === page ? "text-white" : "text-gray-500"
                      }`}
                    >
                      •
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        )}
    </div>
  );
}

function ArtistArticleView({
  artistPageState,
}: {
  artistPageState: ArtistPageState;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(
    (artistPageState.artistArticleList?.length || 0) / itemsPerPage
  );
  const currentItems = artistPageState.artistArticleList?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    artistPageState.artistArticleList && (
      <div className="flex flex-col mt-20 justify-center">
        <h2 className={`${pretendardBold.className} text-6xl mb-10`}>ARTICLES</h2>
        <ul className="list-disc list-inside space-y-4 px-4 md:px-10 text-3xl mt-10">
          {currentItems?.map((article, index) => (
            <li key={index} className="text-left">
              <Link
                href={(article.src as string) ?? ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className={`${pretendardRegular.className} text-md text-white ml-2 hover:underline`}
                >
                  {article.title}
                </span>{" "}
                <span
                  className={`${pretendardBold.className} text-sm text-orange-400`}
                >
                  {article.source?.toUpperCase()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                }}
                className={`text-md md:text-lg px-3 py-1 rounded ${
                  currentPage === page ? "text-white" : "text-gray-100"
                }`}
              >
                •
              </button>
            ))}
          </div>
        )}
      </div>
    )
  );
}

export default ArtistPage;
