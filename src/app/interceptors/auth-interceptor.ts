// src/app/interceptors/auth-interceptor.ts
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

/**
 * Interceptor funcional: añade Authorization Bearer SOLO a las rutas
 * que apuntan al backend (apiBaseUrl) y contienen /api/
 * Ignora rutas que contienen /public/api/.
 */
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const apiBaseUrl = environment.apiBaseUrl ?? '';
  const secret = environment.apiSecret ?? '';

  if (req.url.includes('/public/api/')) {
    return next(req);
  }

  // solo añadimos token a llamadas que vayan al backend (apiBaseUrl) y sean /api/
  if (apiBaseUrl && req.url.includes(apiBaseUrl) && req.url.includes('/api/')) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${secret}`,
      },
    });
    return next(cloned);
  }

  // resto de peticiones: sin cambios
  return next(req);
};
