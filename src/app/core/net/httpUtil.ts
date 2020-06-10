import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {StorageUtil} from '../storage/storageUtil';
import {NzMessageService} from 'ng-zorro-antd';

/**
 * Http工具类封装
 * @author Perfree
 */
@Injectable()
export class HttpUtil {

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private storageUtil: StorageUtil
  ) {
  }

  pipGet(url: string) {
    url = 'http://' + environment.SERVER_URL + url;
    return this.http.get(url).pipe();
  }

  /**
   * Get请求
   * @param url 请求的url
   */
  get(url: string) {
    url = 'http://' + environment.SERVER_URL + url;
    return this.http.get(url).toPromise().then((data: any) => {
      return data;
    }).catch(this.handleError);
  }

  /**
   * Post请求
   * @param url 请求的url
   * @param param 请求参数
   */
  post(url: string, param?: any) {
    url = 'http://' + environment.SERVER_URL + url;
    return this.http.post(url, param).toPromise().then((data: any) => {
      return data;
    }).catch(this.handleError);
  }

  /**
   * delete请求
   * @param url 连接
   */
  delete(url: string) {
    url = 'http://' + environment.SERVER_URL + url;
    return this.http.delete(url).toPromise().then((data: any) => {
      return data;
    }).catch(this.handleError);
  }

  /**
   * ajax下载文件
   * @param url 请求地址
   * @param fileName 文件名
   * @param param 参数
   * @param fileSizeIsZeroMsg 文件大小为0的文字提示
   */
  download(url: string,  fileName: string, param?: any) {
    param.fileName = fileName;
    url = 'http://' + environment.SERVER_URL + url;
    this.http.post(url, param, {responseType: 'blob', observe: 'response'}).toPromise().then(res => {
      if (res.body.size <= 0) {
        this.message.error('文件大小为0(无数据)!');
        return;
      }
      const link = document.createElement('a');
      const blob = new Blob([res.body], {type: res.headers.get('content-type')});
      link.setAttribute('href', window.URL.createObjectURL(blob));
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(this.handleError);
  }

  /**
   * Put请求
   * @param url 请求的url
   * @param param 请求参数
   */
  put(url: string, param?: any) {
    url = 'http://' + environment.SERVER_URL + url;
    return this.http.put(url, param).toPromise().then((data: any) => {
      return data;
    }).catch(this.handleError);
  }

  /**
   * Http请求错误处理
   * @param error 错误信息
   */
  private handleError(error: Response | any) {
    // Http请求错误处理
    console.log(error);
    if (error instanceof Response) {
      console.log(error);
    } else {
    }
  }

  private getHeader() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json;charset=utf-8',
        Authorization: this.storageUtil.get(environment.LOCAL_STORAGE_NAME)
      })
    };
    return httpOptions;
  }
}
