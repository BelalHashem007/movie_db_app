import type { Images } from "../../../app/apiSlice";
import { useAppSelector } from "../../../app/hooks";
import { useEffect, useState, useMemo } from "react";
import { type Backdrop } from "../../../app/apiSlice";
import ImageWithFallback from "../../../components/ImgWithFallback";

export default function MovieGallery({
  images,
  title,
}: {
  images: Images;
  title: string;
}) {
  const [curImg, setCurImg] = useState<number>(0);
  const baseURL = useAppSelector((state) => state.img.url);
  const currentImages: Backdrop[] = useMemo(
    () => images.backdrops.slice(0, 10),
    [images],
  );

  useEffect(() => {
    currentImages.forEach((img, index) => {
      if (index > 0) {
        const link = document.createElement("link");
        link.href = baseURL + "w1280" + img.file_path;
        link.rel = "prefetch";
        link.as = "image";
        document.head.appendChild(link);
      }
    });
  }, [baseURL, currentImages]);

  /*Handlers*/
  function handleCarousels(num: number): void {
    if (num == 1) {
      const newCurImg = curImg == currentImages.length - 1 ? 0 : curImg + 1;
      setCurImg(newCurImg);
    } else if (num == -1) {
      const newCurImg = curImg == 0 ? currentImages.length - 1 : curImg - 1;
      setCurImg(newCurImg);
    }
  }

  function handleSmallImgClick(index: number): void {
    setCurImg(index);
  }

  return (
    <section className="mb-8">
      <h2>Gallery</h2>
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/*Back and Forward buttons*/}
          <button
            className="absolute top-1/2 -translate-y-1/2 z-10 group"
            onClick={() => handleCarousels(-1)}
          >
            <div className="flex flex-col items-center justify-center p-4">
              {/* Upper wing */}
              <div className="w-7 h-1 bg-white -rotate-45 group-hover:bg-blue-300 transition-colors"></div>
              {/* Lower wing */}
              <div className="w-7 h-1 bg-white rotate-45 group-hover:bg-blue-300 transition-colors mt-3.75 "></div>
            </div>
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 z-10 group right-0"
            onClick={() => handleCarousels(1)}
          >
            <div className="flex flex-col items-center justify-center p-4 rotate-180">
              {/* Upper wing */}
              <div className="w-7 h-1 bg-white -rotate-45 group-hover:bg-blue-300 transition-colors "></div>
              {/* Lower wing */}
              <div className="w-7 h-1 bg-white rotate-45 group-hover:bg-blue-300 transition-colors mt-3.75"></div>
            </div>
          </button>
          {/*Current shown image*/}
          <div className={`rounded-lg overflow-hidden aspect-video`}>
            <ImageWithFallback
              src={baseURL + "w1280" + currentImages[curImg].file_path}
              alt={`Gallery image ${title}`}
              className="w-full h-full object-fill"
            />
          </div>
        </div>
        {/*button images*/}
        <ul className="flex flex-nowrap justify-center items-center gap-1 overflow-x-auto mt-2">
          {currentImages.map((img, index) => (
            <li key={index}>
              <button
                onClick={() => handleSmallImgClick(index)}
                className="shrink-0"
              >
                <ImageWithFallback
                  src={baseURL + "w300" + img.file_path}
                  alt={`Gallery image ${title}`}
                  className={`w-25 h-full object-fill ${
                    curImg == index
                      ? "border-2 border-red-400 dark:border-red-600"
                      : ""
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
