import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  var token=localStorage.getItem('AdminToken');
  var newReq=req.clone(
    {
    setHeaders:{
        Authorization:`Bearer ${token}`
      }
    }
  );
  return next(newReq);
};
