import {Injectable} from '@angular/core';

/**
 * LocalStorage操作工具类
 * @author Perfree
 */
@Injectable()
export class StorageUtil {
  constructor() {
  }

  /**
   * 存入localStorage
   * @param key 键
   * @param value 值
   */
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 根据key获取localStorage的值
   * @param key 键
   */
  get(key: string): any {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        return item;
      }
    } else {
      return null;
    }
  }

  /**
   * 根据键移除localStorage
   * @param key 键
   */
  remove(key: string) {
    localStorage.removeItem(key);
  }
}
