import { Carousel } from "antd";

const Banners: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <Carousel
            autoplay
            effect="scrollx"
            autoplaySpeed={3000}
            pauseOnHover={true}
            slidesToShow={1}
            className="rounded-lg"
          >
            <img
              src="src/assets/image/banners/banner-1.1.1.jpg"
              className="mx-auto w-full rounded-2xl"
            />
            <img
              src="src/assets/image/banners/banner-1.1.2.jpg"
              className="mx-auto w-full rounded-2xl"
            />
          </Carousel>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <img
            src="src/assets/image/banners/banner-1.2.1.jpg"
            className="mx-auto max-h-[232px] w-full flex-1 rounded-2xl"
          />
          <img
            src="src/assets/image/banners/banner-1.2.2.jpg"
            className="mx-auto max-h-[232px] w-full flex-1 rounded-2xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <img
          src="src/assets/image/banners/banner-2.1.jpg"
          className="mx-auto w-full rounded-2xl"
        />
        <img
          src="src/assets/image/banners/banner-2.2.jpg"
          className="mx-auto w-full rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Banners;
