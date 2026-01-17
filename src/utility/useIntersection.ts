import { useEffect } from "react";

type Props = {
  target: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  show: boolean;
  setShow: (arg:boolean) => void;
};

export default function useIntersection({
  target,
  isLoading,
  show,
  setShow,
}: Props) {

  useEffect(() => {
    if (isLoading || show || target.current == null) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio <= 0) return;
        setShow(true);
      },
      { rootMargin: "100px" },
    );

    observer.observe(target.current as HTMLDivElement);

    return () => observer.disconnect();
  }, [show, isLoading,setShow,target]);
}
