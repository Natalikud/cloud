import { Link } from 'react-router-dom';

//КОМПОНЕНТ НИЖНЕЙ "ШАПКИ"(подвала)
export default function Footer() {
  return (
    <footer
      className="w-full h-[6vh] bg-[#1a1a1a] text-gray-400 text-xs flex items-center justify-around"
    >
        <div>
          Облачное хранилище НЕТОЛОГИЯ Куделькина Н.В. 
        </div>
        <Link
          to={"/siteinfo"}
        >
          <div
            className="underline  hover:text-gray-300"
          >
            ОБЩАЯ ИНФОРМАЦИЯ
          </div>
        </Link>
    </footer>
  );
}
