const cyrillicToLatinMap: { [key: string]: string } = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  ґ: 'g',
  д: 'd',
  е: 'e',
  є: 'ye',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  і: 'i',
  ї: 'yi',
  й: 'j',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
};

const transliterate = (text: string): string => {
  return text.replace(
    /[а-яё]/gi,
    (char) => cyrillicToLatinMap[char.toLowerCase()] || char,
  );
};

export const slugify = (text: string) => {
  return transliterate(text)
    .normalize('NFD') // Нормализуем строки Unicode
    .replace(/[\u0300-\u036f]/g, '') // Убираем диакритические знаки
    .toLowerCase() // Приводим к нижнему регистру
    .trim() // Убираем пробелы в начале и конце строки
    .replace(/[^a-z0-9 -]/g, '') // Убираем все символы, кроме букв, цифр, пробелов и дефисов
    .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
    .replace(/-+/g, '-'); // Убираем повторяющиеся дефисы
};
