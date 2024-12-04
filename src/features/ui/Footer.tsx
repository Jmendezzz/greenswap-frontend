import { Link } from "react-router-dom";
import Logo from "./Logo";
import { ROUTES } from "@/constants/routes";

function Footer() {
  return (
    <footer className="p-4 bg-primary">
      <div className="w-full max-w-screen-xl p-4 mx-auto md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Logo />
          <ul className="flex flex-wrap items-center mb-6 text-2xl font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to={ROUTES.home} className="hover:underline me-4 md:me-6">
                Inicio
              </Link>
            </li>
            <li>
              <Link to={ROUTES.products} className="hover:underline me-4 md:me-6">
                Productos
              </Link>
            </li>
            <li>
              <Link to={ROUTES.contact} className="hover:underline me-4 md:me-6">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-lg text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{' '}
        GreenSwap
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
