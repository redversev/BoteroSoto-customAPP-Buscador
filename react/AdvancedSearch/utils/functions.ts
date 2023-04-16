export const removeSpecialCharacter = (str:string) => {
	const accents:any = {
    'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U',
    'à':'a','è':'e','ì':'i','ò':'o','ù':'u','À':'A','È':'E','Ì':'I','Ò':'O','Ù':'U',
    'ä':'a','ë':'e','ï':'i','ö':'o','ü':'u','Ä':'A','Ë':'E','Ï':'I','Ö':'O','Ü':'U',
    '/':'-','!':'-','\\':'-','#':'-','{':'-','}':'-','(':'-',')':'-','[':'-',']':'-',
    '$':'-','?':'-','¿':'-','|':'-',' ':'-',',':'','ñ':'n','Ñ':'n'
  };
	return str.split('').map( letter => accents[letter] || letter).join('').toString().toLowerCase();	
}
export const initial = {
    id: "0",
    text: "Selecione una opcion"
  }