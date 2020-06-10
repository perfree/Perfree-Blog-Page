import {AbstractControl} from '@angular/forms';
import {VerifyCodeComponent} from '../../shared/components/verify-code/verify-code.component';

/**
 * 自定义常用数据校验
 * @author Perfree
 */

/**
 * 身份证验证模式
 */

const ID_CARD = {
  patter: /^[1-9]\d{5}(18|19|20|21)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  provPatter: /^[1-9][0-9]/,
  factor: [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
  parity: ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'],
  provs: {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门'
  },
  pickProvince(v) { // 省份
    if (!this.provPatter.test(v)) {
      return '';
    }
    return this.provs[Number(v.substring(0, 2))] || '';
  },
  pickGender(v) { // 性别
    if (!this.isIdCard(v)) {
      return '';
    }
    return Number(v.substring(16, 17)) % 2 === 0 ? '女' : '男';
  },
  getBirthday(v, isToDate: boolean) { // 截取生日
    if (!this.isIdCard(v)) {
      return '';
    }
    const birthday = `${v.substring(6, 10)}-${v.substring(10, 12)}-${v.substring(12, 14)}`;
    if (!isToDate) {
      return birthday;
    }
    return new Date(birthday);
  },
  isIdCard(v: string) {
    if (!this.patter.test(v)) {
      return false;
    }
    const sum = v.substring(0, 17).split('').map((x, i) => Number(x) * this.factor[i]).reduce((x, y) => x + y);
    return this.parity[sum % 11] === v.substring(17).toUpperCase() ? true : false;
  }
};

/**
 * 校验手机号
 */

export function validatorPhone(control: AbstractControl) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (control.value) {
    if (!reg.test(control.value)) {
      return {
        validatorPhone: true
      };
    }
  }
  return null;
}

/**
 * 校验价格
 */
export function validatorPrice(control: AbstractControl) {
  const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
  if (control.value) {
    if (!reg.test(control.value)) {
      return {
        validatorPhone: true
      };
    }
  }
  return null;
}

/**
 * 验证身份证
 */
export function validatorIdCardNumber(control: AbstractControl) {
  if (!control.value || !control.value.trim()) {
    return null;
  }
  return ID_CARD.isIdCard(control.value) ? null : {
    validatorPatient_no: true
  };
}

/**
 * 只能输入数字和英文字母
 */
export function validatorNumberAndEn(control: AbstractControl) {
  const reg = /^[A-Za-z0-9]+$/;
  if (control.value) {
    if (!reg.test(control.value)) {
      return {
        validatorNumberAndEn: true
      };
    }
  }
  return null;
}
