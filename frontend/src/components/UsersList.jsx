import dateFormat from "dateformat";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { focusOnAcc } from '../slices/adminSlice';

// КОМПОНЕНТ ОТОБРАЖЕНИЯ АККАУНТОВ
export default function UsersList({ user }) {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const size = user.fullSize.reduce((acc, val) => (acc + Number(val.size)), 0);

  // Обработчик одинарного клика по акк(записываем фокус в состояние)
  const handleClick = () => {
    return dispatch(focusOnAcc(user.id));
  };

  // Обработчик двойного клика по акк(переход в карточку пользователя)
  const handleDoubleClick = () => {
    if (user.id === userState.id) {
      return navigate('/person_info');
    }
    return navigate(`/user_card/${user.id}`);
  };

  return (
    <div
      className="user w-[98%] py-2 mx-[1%] my-2 rounded-md bg-gray-100 shadow-[0_3px_10px_5px_rgba(0,0,0,0.2)] focus:bg-blue-100 hover:shadow-[0_3px_7px_5px_rgba(0,0,0,0.3)] cursor-pointer"
      tabIndex={-1}
      onClick={(e) => e.detail === 1 ? handleClick() : handleDoubleClick()}
    >
      <div
        className={(user.isAdmin ? "bg-emerald-700" : "bg-sky-700") + " w-full h-3 bg"}
      >
      </div>
      <div
        className="flex justify-around items-center text-sm"
      >
        <span>id: <strong className="text-base">{user.id}</strong></span>
        <span>права: <strong className="text-base">{user.isAdmin ? 'admin' : 'user'}</strong></span>
        <span>почта: <strong className="text-base">{user.email}</strong></span>
        <strong className="text-base">{user.name} {user.lastName}</strong>
        <div
          className="w-1/5 text-xs"
        >
          
          <div>был: <strong>{dateFormat(user.lastVisit, "HH:mm dd.mm.yy.")}</strong></div>
          <div>кол-во файлов: <strong>{user.files}</strong></div>
          <div>общий объем: 
            <strong>
              {(size/1024).toFixed(1) < 1000 ? (size/1024).toFixed(1) + ' Kb' : ((size/1024)/1024).toFixed(1) + ' Mb'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
