import { Carousel } from "antd";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

export default function Footer() {
  const brands = [
    "lottemart",
    "aeon",
    "winmart",
    "grabmart",
    "shopeefood",
    "emart",
    "kingfood",
  ];
  const brandsImages = brands.map(
    (brand) => `/src/assets/image/brands/${brand}.jpg`,
  );

  const paymentMethods = ["cod", "visa", "vnpay", "momo"];
  const paymentMethodImages = paymentMethods.map(
    (method) => `/src/assets/image/payment-methods/${method}.jpg`,
  );

  return (
    <footer className="bg-gray-100 py-8 text-[#003F8F]">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h3 className="font-bold">Đối tác của K-Seafood</h3>
          <Carousel
            autoplay
            effect="scrollx"
            autoplaySpeed={3000}
            pauseOnHover={false}
            slidesToShow={5}
            dots={false}
          >
            {brandsImages.map((brand, index) => (
              <div className="overflow-hidden p-2" key={index}>
                <img
                  src={`${brand}`}
                  className="object-cove mx-auto max-h-11 w-full lg:max-h-14"
                />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Thông tin */}
          <div>
            <h3 className="mb-2 font-bold">THÔNG TIN</h3>
            <ul className="space-y-1">
              <li>Góc Ẩm Thực</li>
              <li>Chính Sách / Ưu Đãi</li>
              <li>Hệ Thống Cửa Hàng</li>
              <li>Chương Trình KHTT</li>
              <li>FeedBack</li>
              <li>Tươi Sống Mỗi Ngày</li>
            </ul>
          </div>

          {/* Chính sách */}
          <div>
            <h3 className="mb-2 font-bold">CHÍNH SÁCH</h3>
            <ul className="space-y-1">
              <li>Đăng Ký Đại Lý/CTV</li>
              <li>Giao nhận hàng</li>
              <li>Hướng dẫn đặt hàng</li>
              <li>Chính sách đổi trả hàng</li>
              <li>Giải quyết khiếu nại</li>
              <li>Cam kết chất lượng</li>
            </ul>
          </div>

          {/* Kết nối */}
          <div>
            <h3 className="mb-2 font-bold">KẾT NỐI VỚI CHÚNG TÔI</h3>
            <div className="flex space-x-2">
              <FaFacebook className="text-2xl text-blue-600" />
              <FaYoutube className="text-2xl text-red-600" />
              <SiZalo className="text-2xl text-blue-500" />
              <FaTiktok className="text-2xl text-black" />
              <FaInstagram className="text-2xl text-pink-600" />
            </div>
          </div>

          {/* Thanh toán */}
          <div>
            <h3 className="mb-2 font-bold">PHƯƠNG THỨC THANH TOÁN</h3>
            <div className="flex space-x-2">
              {paymentMethodImages.map((method, index) => (
                <img key={index} src={`${method}`} className="h-10" />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm">
          <p>
            © 2021 K-Seafood. All rights reserved. Designed by{" "}
            <a href="/" className="underline hover:text-blue-900">
              K-Seafood
            </a>
          </p>

          <p>Địa chỉ: 123 Đường ABC, Phường XYZ, Quận TUV, TP. HCM</p>
          <p>Hotline: 0123 456 789</p>
          <p>Email: kseafood@fake.mail.com</p>
        </div>
      </div>
    </footer>
  );
}
