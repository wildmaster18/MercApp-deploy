// URL base del API leida desde la variable de entorno de Vite
// En desarrollo usa cadena vacia para aprovechar el proxy de Vite
// En produccion apunta al dominio de Railway definido en VITE_API_URL
const URL_API = import.meta.env.VITE_API_URL || ''

export { URL_API }
