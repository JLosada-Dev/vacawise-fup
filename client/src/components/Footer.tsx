import { Link } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className="bg-white h-20 relative">
      <MaxWidthWrapper>
        <div className="border-t border-gray-200" />

        <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
          <div className="text-center md:text-left pb-2 md:pb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Todos los derechos reservados
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex space-x-8">
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
                target="_blank"
              >
                Yonier Lopez
              </Link>
              <Link
                to="https://github.com/JLosada-Dev"
                className="text-sm text-muted-foreground hover:text-gray-600"
                target="_blank"
              >
                José Losada
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
                target="_blank"
              >
                José Manzano
              </Link>
              <Link
                to="https://github.com/GitDevCamilo"
                className="text-sm text-muted-foreground hover:text-gray-600"
                target="_blank"
              >
                Camilo Meneses
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
