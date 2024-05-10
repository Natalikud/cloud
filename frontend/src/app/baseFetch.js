import localforage from 'localforage';
import { saveAs } from 'file-saver';

// Базовая функция запросов на сервер
export default async function baseFetch({ url, method, headers, body, out, file, del, fUrl, }) {
  const status = [200, 201, 204, 400, 403, 404, 409, ];
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });
    
    // Проверка контролируемых ответов сервера
    if (!status.includes(response.status)) {
      throw new Error(response.statusText);
    }

    // Удаление файла/акк
    if (del) {
      return response;
    }

    // Отмена аутентификации(выход)
    // БЫЛО ДО ЗАПРОСА
    if (out) {
      await localforage.setItem('sessionToken', undefined);
      return;
    }

    // Сохранение 
    if (file) {
      if (response.status === 403) {
        return await response.json();
      }
      const blob = await response.blob();
      return saveAs(blob, file);
    }

    // Сохранение файла по ссылке сторонним пользователем


    /*if (fUrl) {
      if (response.status === 404) {
        return await response.json();
      }

      //Получение оригинального имени файла из заголовка 'Content-Disposition'
      let fileName;

      if (decodeURIComponent(response.headers.get('Content-Disposition')).includes('filename*')) {
        fileName = decodeURIComponent(response.headers.get('Content-Disposition').split("''")[1]);
      } else {
        fileName = decodeURIComponent(response.headers.get('Content-Disposition')).split("=")[1].replaceAll('"', '');
      }

      const blob = await response.blob();
      return { [fileName]: blob };
    }*/

    // Сохранение файла по ссылке сторонним пользователем
    if (fUrl) {
      // Отладочный вывод: проверяем, что флаг fUrl установлен
      console.log('fUrl flag is set');
      
      if (response.status === 404) {
        // Отладочный вывод: проверяем, если статус ответа 404
        console.log('File not found');
        return await response.json();
      }


      // Отладочный вывод: проверяем содержимое заголовка Content-Disposition
      console.log('Content-Disposition header:', response.headers.get('Content-Disposition'));
      
      // Получение оригинального имени файла из заголовка 'Content-Disposition'
      let fileName;
      
      if (decodeURIComponent(response.headers.get('Content-Disposition')).includes('filename*')) {
        fileName = decodeURIComponent(response.headers.get('Content-Disposition').split("''")[1]);
      } else {
        fileName = decodeURIComponent(response.headers.get('Content-Disposition')).split("=")[1].replaceAll('"', '');
      }
      
      // Отладочный вывод: проверяем полученное имя файла
      console.log('File name:', fileName);
      
      const blob = await response.blob();
      // Отладочный вывод: проверяем содержимое файла
      console.log('File blob:', blob);
      
      return { [fileName]: blob };
    }
    
    
    const result = await response.json();

    // Получение токена сессии после успешной аутентификации
    if (result.sessionToken) {
      await localforage.setItem('sessionToken', result.sessionToken);
    }
    
    return result;
  } catch(err) {
    throw new Error(err.message);
  }
}
