import { redirect, useLoaderData } from 'react-router-dom';
import { isAdmin, getPerson, deleteFile, getDownloadURL } from '../app/apiRequests';
import { useLogin, useOutsideFileClick } from '../app/customHooks';
import FileListView from '../components/FileListView';
import FileTileView from '../components/FileTileView';
import {handleName} from '../app/helpers';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCloud from '../components/HeaderCloud';
import { deleteFileFromFiles, deleteFocusOnFile, focusOnFile, hideDeleteConfirm } from '../slices/cloudSlice';
import ModalConfermDelete from '../components/ModalConfermDelete';
import ModalShareURL from '../components/ModalShareURL';

// Проверяем авторизацию и получаем данные аккаунта
export async function loader() {
  const check = await isAdmin();
  if (check.admin) {
    return redirect('/admin');
  }
  const person = await getPerson();
  if (person.error) {
    return redirect('/');
  }
  return { person };
}

//КОМПОНЕНТ(роут) СТРАНИЦЫ ПОЛЬЗОВАТЕЛЬСКОГО ИНТЕРФЕЙСА
export default function UserInterface() {
  const cloudState = useSelector((state) => state.cloud);
  const { person } = useLoaderData();
  const dispatch = useDispatch();
  useLogin({person});
  useOutsideFileClick();

  // Обработчик фокусировки на файле
  const handleFocusOnFile = (e) => {
    dispatch(focusOnFile(e.target.getAttribute('id')));
  }

  return (
    <div
      className="w-full pt-[3%] min-h-full bg-blue-200"
    >
      <div
        className="w-[94%] mx-auto min-h-52 bg-white rounded-xl"
      >
        <HeaderCloud />
        <section
          className="w-full p-5 rounded-b-xl"
        >
          <>
            {cloudState.share ? (
              <ModalShareURL
                fetch={getDownloadURL}
                files={cloudState.files}
              />) : (null)}
            {cloudState.confirm ? (
              <ModalConfermDelete
                state={cloudState}
                request={deleteFile}
                hide={hideDeleteConfirm}
                delFocus={deleteFocusOnFile}
                delElement={deleteFileFromFiles}
              />
            ) : (
              <></>
            )}
          </>
          {cloudState.message ? (
            <div
              className='mx-auto h-3 block text-center text-red-800'
            >
              <span
                className='text-xs'
              >
                Вы не выбрали файл!
              </span>
            </div>
          ) : (
            <div className='h-3'></div>
          )}
          <h1>Файлы:</h1>
          <div
            className="w-full flex justify-start flex-wrap gap-3"
          >
            {cloudState.files.length === 0 ? (
              <div
                className="w-full flex justify-center"
              >
                <h2>Вы еще ничего не загрузили...</h2>
              </div>
            ) : (
              cloudState.view ? (
                <>
                  {cloudState.files.map((file) => {
                    return (
                      <FileListView
                        key={file.id}
                        id={file.id}
                        src={handleName(file.name)}
                        fileName={file.name}
                        size={file.size}
                        created={file.created}
                        focus={handleFocusOnFile}
                        fetch={getDownloadURL}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  {cloudState.files.map((file) => {
                    return (
                      <FileTileView
                        key={file.id}
                        id={file.id}
                        src={handleName(file.name)}
                        fileName={file.name}
                        focus={handleFocusOnFile}
                      />
                    );
                  })}
                </>
              )
            )} 
          </div>
        </section>
      </div>
    </div>
  );
}
