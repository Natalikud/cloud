import { useSelector } from 'react-redux';
import { Link, Form, redirect } from 'react-router-dom';
import { logout } from '../app/apiRequests';

// Функция обратной аутентификации(выхода)
export async function action() {
  await logout();
  return redirect('/');
}

//КОМПОНЕНТ "ШАПКИ"(заголовка) С НАВИГАЦИЕЙ
export default function Header() {
  const appState = useSelector((state) => state.app);
  const userState = useSelector((state) => state.user);
  
  return (
    <header
      className="w-full h-[5vh] bg-gray-400 flex justify-center overflow-x-hidden"
    >
      <div
        className="w-full lg:w-[60vw] h-full bg-gray-500 overflow-x-hidden"
      >
        <nav
          className="w-full h-full flex justify-between items-center"
        >
          <Link
            to={"/"}
            className="ml-10 text-sky-50 font-bold hover:text-gray-400"
          >
            Главная
          </Link>
          <div
            className="h-full mr-10 flex items-center"
          >
            <Link
              to={appState.login ? "/person_info" : "/"}
              className="mr-5"
            >
              <div
                className="w-[4vh] h-[3vh] hover:border-gray-600"
              >
                <img
                  title="Выйти"
                  className="w-full h-full object-cover"
                  src={userState.avatar}
                  alt=""
                />
              </div>
            </Link>
            {appState.login ? (
              <Form
                method="post"
              >
                
                <button
                  type="submit"
                  className="text-sm font-bold hover:text-gray-800"
                >
                  Выйти
                </button>
              </Form>
            ) : (
              <></>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
