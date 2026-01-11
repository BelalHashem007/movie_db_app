import type { Images } from "../../app/apiSlice";
import { useAppSelector } from "../../app/hooks";
import Icon from "@mdi/react";
import { mdiArrowLeftDropCircle, mdiArrowRightDropCircle } from "@mdi/js";
import { useState } from "react";

export default function MovieGallery({
  images,
  title,
}: {
  images: Images;
  title: string;
}) {
  const [curImg, setCurImg] = useState(0);
  const baseURL = useAppSelector((state) => state.img.url);
  const currentImages = images.backdrops.slice(0, 10);

  function handleCarousels(num: number) {
    if (num == 1) {
      const newCurImg = curImg == currentImages.length - 1 ? 0 : curImg + 1;
      setCurImg(newCurImg);
    } else if (num == -1) {
      const newCurImg = curImg == 0 ? currentImages.length - 1 : curImg - 1;
      setCurImg(newCurImg);
    }
  }
  
  function handleSmallImgClick(index:number){
    setCurImg(index)
  }

  return (
    <section className="mb-8">
      <h2 className={`text-3xl mb-6 dark:text-white text-gray-900`}>Gallery</h2>
      <div className="relative max-w-7xl mx-auto">
        <div>
          {/*Back and Forward buttons*/}
          <button
            className="absolute top-[50%] z-1"
            onClick={() => handleCarousels(-1)}
          >
            <Icon
              path={mdiArrowLeftDropCircle}
              size={2}
              className="text-black fill-white dark:text-white dark:fill-black  -translate-x-12"
            />
          </button>
          <button
            className="absolute top-[50%] translate-x-12 z-1 right-0"
            onClick={() => handleCarousels(1)}
          >
            <Icon
              path={mdiArrowRightDropCircle}
              size={2}
              className="text-black fill-white dark:text-white dark:fill-black"
            />
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
          {currentImages.map((img,index) => (
            <button onClick={()=>handleSmallImgClick(index)} className="shrink-0">
              <img
                src={baseURL + "w300" + img.file_path}
                alt={`Gallery image ${title}`}
                className={`w-25 h-full object-fill ${curImg == index ? "border-2 border-red-400 dark:border-red-600":""}`}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
