import { RefObject, useEffect } from "react";

export default function useInfiniteScrolling(
  loaderRef: RefObject<HTMLDivElement>,
  isLoading: boolean,
  operation: () => void
) {
  useEffect(() => {
    const loaderElement = loaderRef.current;
    if (!loaderElement || isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          console.log("first");
          operation();
        }
      },
      {
        root: loaderElement.parentElement,
      }
    );

    observer.observe(loaderElement);

    return () => {
      observer.unobserve(loaderElement);
      observer.disconnect();
    };
  }, [isLoading, loaderRef.current]);

  return;
}
