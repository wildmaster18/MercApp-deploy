import { ref } from "vue";
import { URL_API } from "@/config";

const rutaApi = URL_API + "/api";

// Estado compartido a nivel de modulo para que toda la app vea la misma sesion
const usuario = ref(null);
const cargando = ref(false);
// Indica si ya se consulto la sesion al backend al menos una vez
const verificado = ref(false);

// Composable de autenticacion que se apoya en la sesion del backend
export function useAuth() {
  // Consulta al backend si hay una sesion activa mediante la cookie
  async function verificarSesion() {
    cargando.value = true;
    try {
      const respuesta = await fetch(rutaApi + "/auth/me", {
        method: "GET",
        credentials: "include",
      });
      const datos = await respuesta.json();
      if (datos.user) {
        usuario.value = datos.user;
        // Guarda el nombre como apoyo visual para el chat
        localStorage.setItem("mercapp_usuario", datos.user.nomUsu);
      } else {
        usuario.value = null;
        localStorage.removeItem("mercapp_usuario");
      }
    } catch (err) {
      // Si falla la consulta se asume que no hay sesion
      usuario.value = null;
    } finally {
      verificado.value = true;
      cargando.value = false;
    }
  }

  // Envia las credenciales al backend y crea la sesion si son correctas
  async function login(nomUsu, passUsu) {
    cargando.value = true;
    try {
      const respuesta = await fetch(rutaApi + "/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomUsu: nomUsu.trim(), passUsu }),
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) {
        return { ok: false, error: datos.error || "Error al iniciar sesion" };
      }
      usuario.value = datos.user;
      verificado.value = true;
      localStorage.setItem("mercapp_usuario", datos.user.nomUsu);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: "No se pudo conectar con el servidor" };
    } finally {
      cargando.value = false;
    }
  }

  // Registra un usuario nuevo y deja la sesion iniciada
  async function register(nomUsu, passUsu) {
    cargando.value = true;
    try {
      const respuesta = await fetch(rutaApi + "/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomUsu: nomUsu.trim(), passUsu }),
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) {
        // Reune los mensajes de validacion si el backend los envia
        let mensaje = datos.error || "Error al registrarse";
        if (datos.errors) {
          mensaje = datos.errors.map((e) => e.msg).join(". ");
        }
        return { ok: false, error: mensaje };
      }
      usuario.value = datos.user;
      verificado.value = true;
      localStorage.setItem("mercapp_usuario", datos.user.nomUsu);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: "No se pudo conectar con el servidor" };
    } finally {
      cargando.value = false;
    }
  }

  // Cierra la sesion en el backend y limpia el estado del frontend
  async function logout() {
    try {
      await fetch(rutaApi + "/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      // Aunque falle la peticion se limpia el estado local
    } finally {
      usuario.value = null;
      localStorage.removeItem("mercapp_usuario");
    }
  }

  return {
    usuario,
    cargando,
    verificado,
    verificarSesion,
    login,
    register,
    logout,
  };
}
