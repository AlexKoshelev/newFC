export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize; // получаем индекс, с которого начнем обрезать массив
  return [...items].splice(startIndex, pageSize); //возвращаем обрезанный массив
}
