import { useEffect, useState } from "react";

export const useSwiper = (num: number) => {
  function useInterval(callback: (timer: number) => void, interval: number) {
    useEffect(() => {
      const start = new Date().getTime();
      const I = setInterval(() => {
        callback(new Date().getTime() - start);
      }, interval);
      return () => clearInterval(I);
    }, []);
  }

  function useSlider(N: number, speed = 3000) {
    const [slider, setSlider] = useState(0);
    useInterval((diff) => {
      setSlider((_) => Math.floor(diff / speed) % N);
    }, 300);
    return slider;
  }
  const slider = useSlider(num);
  const Swiper = (
    <div className={"outer"}>
      <style jsx>{`
        .outer {
          width: 600px;
          height: 300px;
          overflow: hidden;
        }

        .inner {
          width: 300%;
          height: 100%;
          overflow: scroll;
          transition: transform 0.3s ease;
        }
        .inner::-webkit-scrollbar {
          display: none;
        }
        .inner img {
          width: 33.33%;
          height: 300px;
          display: block;
          float: left;
        }
      `}</style>

      <div
        className={"inner"}
        style={{
          width: `${300}%`,
          transform: `translateX(${-100 * (slider / num)}%)`,
        }}
      >
        <div>
          <img src={"/images/swiper/swiper1.jpg"} alt="swiper1" />
        </div>
        <div>
          <img src={"/images/swiper/swiper2.jpg"} alt="swiper2" />
        </div>
        <div>
          <img src={"/images/swiper/swiper3.jpg"} alt="swiper3" />
        </div>
      </div>
    </div>
  );

  return {
    Swiper,
  };
};
