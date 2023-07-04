// 常量
// 尾部加项目包名，用于和其他项目区分，连接符统一用下划线
const PACKAGE_NAME = 'ice-admin'.toLocaleUpperCase().replace(/-/gi, '_');

// 本地存储用户令牌
export const LOCAL_TOKEN = `LOCAL_TOKEN_${PACKAGE_NAME}`;

// 本地存储用户信息
export const LOCAL_USERINFO = `LOCAL_USERINFO_${PACKAGE_NAME}`;

// 本地存储主题（注意：index.html使用了这个变量，如果改了项目包名，index.html也要修改）
export const LOCAL_THEME = `LOCAL_THEME_${PACKAGE_NAME}`;

// 本地存储语言
export const LOCAL_LANGUAGE = `LOCAL_LANGUAGE_${PACKAGE_NAME}`;
