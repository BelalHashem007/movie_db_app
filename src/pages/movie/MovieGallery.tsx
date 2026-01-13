import type { Images } from "../../app/apiSlice";
import { useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { type Backdrop } from "../../app/apiSlice";

export default function MovieGallery({
  images,
  title,
}: {
  images: Images;
  title: string;
}) {
  const [curImg, setCurImg] = useState<number>(0);
  const baseURL = useAppSelector((state) => state.img.url);
  const currentImages:Backdrop[] = images.backdrops.slice(0, 10);

  function handleCarousels(num: number):void {
    if (num == 1) {
      const newCurImg = curImg == currentImages.length - 1 ? 0 : curImg + 1;
      setCurImg(newCurImg);
    } else if (num == -1) {
      const newCurImg = curImg == 0 ? currentImages.length - 1 : curImg - 1;
      setCurImg(newCurImg);
    }
  }

  function handleSmallImgClick(index: number):void {
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
            <img
              src={baseURL + "w1280" + currentImages[curImg].file_path}
              alt={`Gallery image ${title}`}
              className="w-full h-full object-fill"
              loading="lazy"
            />
          </div>
        </div>
        {/*button images*/}
        <div className="flex flex-nowrap justify-center items-center gap-1 overflow-x-auto mt-2">
          {currentImages.map((img, index) => (
            <button
              key={index}
              onClick={() => handleSmallImgClick(index)}
              className="shrink-0"
            >
              <img
                src={baseURL + "w300" + img.file_path}
                alt={`Gallery image ${title}`}
                className={`w-25 h-full object-fill ${
                  curImg == index
                    ? "border-2 border-red-400 dark:border-red-600"
                    : ""
                }`}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
