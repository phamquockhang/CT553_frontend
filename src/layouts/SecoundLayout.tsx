import { Outlet } from "react-router-dom";

const SecoundLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <div className="container mx-auto px-10 transition-all duration-200 xl:px-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SecoundLayout;
