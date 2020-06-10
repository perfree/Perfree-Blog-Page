import {Injectable} from '@angular/core';
import {HttpUtil} from '../net/httpUtil';
import {StorageUtil} from '../storage/storageUtil';
import {NzMessageService} from 'ng-zorro-antd';

/**
 * 定义Kit套件工具,用于获取常用数据,如用户信息
 * @author Perfree
 */
@Injectable()
export class Kit {

  constructor(
    private storageUtil: StorageUtil,
    private httpUtil: HttpUtil,
    private message: NzMessageService
  ) {
  }

  /**
   * 获取几天前的或几天后日期数组
   * @param range 几天前或几天后
   */
  getRangeDayDate(range: number) {
    const formatDate = (time: any) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date(time);
      const year: number = Dates.getFullYear();
      const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
     /* return year + '-' + month + '-' + day;*/
      return month + '月' + day + '日';
    };

    const resultArr: Array<any> = [];
    if (range < 0) {
      for (let i = Math.abs(range); i >= 0; i--) {
        resultArr.push(formatDate(new Date().getTime() + (-1000 * 3600 * 24 * i)));
      }
    } else {
      for (let i = 1; i <= range; i++) {
        resultArr.push(formatDate(new Date().getTime() + (1000 * 3600 * 24 * i)));
      }
    }
    return resultArr;
  }

  /**
   * 获取前12个月的数组
   */
  getRangeYearDate() {
    const dataArr = [];
    const data = new Date();
    const year = data.getFullYear();
    data.setMonth(data.getMonth() + 1);
    for (let i = 0; i < 12; i++) {
      data.setMonth(data.getMonth() - 1);
      dataArr.push((data.getMonth() + 1) + '月');
    }
    return dataArr.reverse();
  }
}
