import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.css']
})
export class ExceptionComponent implements OnInit {
  exceptionMsg = '';
  breakStatus = 404;
  breakMsg = '';
  timerNumber = 3;
  timerStatus = true;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.clear();
    const pathname = location.pathname;
    switch (pathname) {
      case '/400':
        this.exceptionMsg = '400 请求错误';
        this.breakStatus = 400;
        this.timerStatus = false;
        break;
      case '/401':
        this.exceptionMsg = '登录已过期,请重新登录';
        this.breakStatus = 401;
        this.breakMsg = '跳转至登录页';
        break;
      case '/403':
        this.exceptionMsg = '403 暂无权限访问此页面';
        this.breakStatus = 403;
        this.timerStatus = false;
        break;
      case '/500':
        this.exceptionMsg = '500 服务器发生错误';
        this.breakStatus = 500;
        this.timerStatus = false;
        break;
      default:
        this.exceptionMsg = '404 页面找不到';
        this.breakStatus = 404;
        this.timerStatus = false;
        break;
    }
    if (this.timerStatus) {
     this.timer();
   }
  }

  /**
   * 跳转事件
   */
  break() {
    switch (this.breakStatus) {
      case 401:
        this.router.navigateByUrl('/passport/login');
        break;
      case 403:
        history.go(-1);
        break;
      case 404:
        history.go(-1);
        break;
      case 500:
        history.go(-1);
        break;
    }
  }

  /**
   * 倒计时
   */
  timer() {
    const interval = setInterval(() => {
      if (this.timerNumber > 0) {
        this.timerNumber--;
      } else {
        clearInterval(interval);
        this.break();
      }
    }, 1000);
  }
}
