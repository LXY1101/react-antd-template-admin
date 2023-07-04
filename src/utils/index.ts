import React from 'react';
import { LOCAL_TOKEN } from '@/consts';
import { browser } from 'idfe-utils';
import { MenuItem } from '.././components/MainLayout/types';
import { Translation } from 'react-i18next';

const { getItem } = browser.localStorage;

/**
 * JS获取地址栏url参数
 * search 要取参数的字符串，一般以?开头，如果不以?开头，本方法会进行处理
 * name 参数名，如果不传则返回全部参数
 * name 参数是字符串则返回对应url参数值字符串，无url参数值返回空字符串；name参数是字符串数组或不传则返回对应url参数值对象，无url参数返回：{}
 */
export function getUrlParam(search: string, name: string | string[] | undefined) {
  // 处理查询字符串
  var searchStr = search;
  if (searchStr.substring(0, 1) === '?') {
    searchStr = searchStr.substring(1);
  } else {
    var urls = search.split('?');
    // 如果关键数组长度大于等于2，代表有路由参数
    searchStr = urls.length >= 2 ? urls[1] : '';
  }

  // name参数为字符串
  if (typeof name === 'string') {
    // 如果查询字符串为空，返回空字符串
    if (searchStr === '') return '';

    // 构造一个含有目标参数的正则表达式对象
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    // 匹配目标参数
    var r = searchStr.match(reg);
    if (r != null) return unescape(r[2]) || '';
    return '';
  }

  // 不传name或name不是字符串
  if (name instanceof Array || name == null) {
    // 如果查询字符串为空，name也是空，返回{}
    if (searchStr === '' && name == null) return {};

    // 如果是数组类型，则获取含数组内容的查询对象
    var searchArr = searchStr && searchStr.split('&'),
      a,
      b,
      searchObj = {} as any,
      resultObj = {} as any;
    if (searchArr && searchArr.length) {
      for (var i = 0; i < searchArr.length; i++) {
        a = searchArr[i].split('=');
        b = unescape(decodeURIComponent(a[1] || ''));
        searchObj[a[0]] = b;
      }
    }
    if (name instanceof Array) {
      for (i = 0; i < name.length; i++) {
        resultObj[name[i]] = searchObj[name[i]] || '';
      }
    } else {
      // 如果没有参数或者参数为null，取全部query
      resultObj = searchObj;
    }
    return resultObj;
  }

  return {};
}

// 返回指定属性的菜单对象
export function getMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[] | null,
  className?: string // 自定义菜单项样式，这里隐藏不需要展示的菜单项
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    className
  } as MenuItem;
}

// 判断本地token数据
export function isHasToken() {
  let token = getItem(LOCAL_TOKEN);
  return Boolean(token);
}

// 翻转对象中的键和值
interface IObj {
  [key: string]: string; // 字段扩展声明
}
export function reversed(obj: IObj) {
  let res = <IObj>{};
  for (let key in obj) {
    res[obj[key]] = key;
  }
  return res;
}

// 字符串去重
export function unique(arr: string[]) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

// 修改对象数组的label
export function updateLabel(arr: Array<any>, fn: Function) {
  arr.forEach((obj) => {
    if (obj.label) {
      obj.label = fn(obj.label);
    }
    if (obj.children && obj.children.length > 0) {
      updateLabel(obj.children, fn);
    }
  });
  return arr;
}
