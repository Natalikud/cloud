//КОМПОНЕНТ ОТОБРАЖЕНИЯ ФАЙЛОВ ПОЛЬЗОВАТЕЛЯ ПЛИТКОЙ
export default function FileTileView({ id, src, fileName, focus }) {

  return (
    <div
      id={id}
      className="file w-28 h-32 p-2 flex flex-col items-center hover:bg-blue-100 focus:bg-blue-100 focus:hover:bg-blue-200 outline-none rounded-md cursor-default"
      tabIndex={-1}
      onFocus={(e) => focus(e)}
    >
      <div
        className="w-20 h-20"
      >
        
        <img src={src} alt="" />
      </div>
      <div
        className="w-full h-4 text-xs text-center"
      >
        {fileName.length > 20 ? fileName.slice(0, 13) + ' ...' + fileName.slice(-7) : fileName}
      </div>
    </div>
  );
}
