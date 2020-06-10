import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {StorageUtil} from '../storage/storageUtil';
import {environment} from '../../../environments/environment';

/**
 * 自定义Http拦截器，用于拦截请求信息后状态码的解析判断
 * @author Perfree
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  /**
   * 常用状态码
   */
  private CODEMESSAGE = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };

  constructor(
    private router: Router,
    private message: NzMessageService,
    private storageUtil: StorageUtil
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq: HttpRequest<any>;
    /* HTTP拦截,向header追加token*/
    const token = this.storageUtil.get(environment.LOCAL_STORAGE_NAME);
    if (token !== null && token !== undefined && token !== '') {
      authReq = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
    } else {
      authReq = req.clone();
    }
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => this.handleData(err))
    );
  }

  /**
   * 处理数据
   * @param event 响应
   */
  private handleData(
    event: HttpResponse<any> | HttpErrorResponse,
  ): Observable<any> {
    // 业务处理：一些通用操作
    switch (event.status) {
      case 400:
        this.router.navigateByUrl('/400');
        return of(event);
      case 401:
        this.router.navigateByUrl('/401');
        return of(event);
      case 403:
        this.router.navigateByUrl('/403');
        return of(event);
      case 404:
        this.router.navigateByUrl('/404');
        return of(event);
      case 500:
        this.router.navigateByUrl('/500');
        return of(event);
      default:
        if (event instanceof HttpErrorResponse) {
          console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', event);
          return throwError(event);
        }
        break;
    }
    return throwError(event);
  }
}
