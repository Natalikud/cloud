import dateFormat from 'dateformat';
import { useSelector } from 'react-redux';
import { fileSize, unsecuredCopyToClipboard } from '../app/helpers';
import { useNavigate } from 'react-router-dom';

// КОМПОНЕНТ ОТОБРАЖЕНИЯ ФАЙЛОВ ПОЛЬЗОВАТЕЛЯ СПИСКОМ
export default function FileListView({ id, src, fileName, size, created, focus, fetch}) { 
  const cloudState = useSelector((state) => state.cloud);
  const navigate = useNavigate();

  // Обработчик нажатия иконки копирования ссылки
  const handleCopy = async () => {
    const response = await fetch(cloudState.onFocus);
    if (response.error) {
      return navigate('/');
    }

    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(response.url);
    } else {
      unsecuredCopyToClipboard(response.url);
    }

    return;
  };

  return (
    <div
      id={id}
      className="file w-full mb-1 h-14 p-2 flex items-center outline-none rounded-md cursor-default bg-slate-50 hover:bg-blue-100 focus:bg-blue-100 focus:hover:bg-blue-200"
      tabIndex={-1}
      onFocus={(e) => focus(e)}
    >
      <div
        className="w-12 h-12"
      >
        
        <img src={src} alt="" />
      </div>
      <div
        className="w-3/5 h-5 px-2 text-xs"
      >
        {fileName.length > 45 ? fileName.slice(0, 38) + ' ...' + fileName.slice(-7) : fileName}
      </div>
      <div
        className="w-[13%] h-5 text-xs"
      >
        {fileSize(size)} 
      </div>
      <div
        className="w-[13%] h-5 text-xs"
      >
        {dateFormat(created, 'dd.mm.yyyy')}
      </div>
      <div
        className="w-[13%] h-5 flex justify-center"
      >
          <div
            className="w-5 h-5 hover:bg-gray-200 active:shadow-[0_0px_10px_4px_rgba(34,60,80,0.2)] cursor-pointer"
            onClick={handleCopy}
          >
            <img src="/img/copylink.png" alt="copyLink" />
          </div>
      </div>
    </div>
  );
}
