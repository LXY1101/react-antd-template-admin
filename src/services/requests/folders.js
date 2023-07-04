// 获取文件夹列表
export const getFolders = ({ page = 1, page_size = 1, keyword = '' } = {}) => {
  let search = `?page=${page}&page_size=${page_size}`;
  if (keyword !== '') {
    search += `&keyword=${keyword}`;
  }
  return {
    url: `/configVersion/folderList${search}`,
    method: 'get'
  };
};

// 获取文件夹文件列表
export const getFoldersFile = ({ page = 1, page_size = 1, folder_id = '', keyword = '' }) => {
  let search = `?page=${page}&page_size=${page_size}&folder_id=${folder_id}`;
  if (keyword !== '') {
    search += `&keyword=${keyword}`;
  }
  return {
    url: `/configVersion/fileList${search}`,
    method: 'get'
  };
};

// 获取文件夹文件列表
export const getFoldersFileHistory = (folder_id, file_name, page = 1, page_size = 100) => ({
  url: `/configVersion/fileHistoryList?folder_id=${folder_id}&file_name=${file_name}&page=${page}&page_size=${page_size}`,
  method: 'get'
});

// 创建文件夹
export const createFolder = (data) => ({
  url: `/configVersion/createFolder`,
  method: 'post',
  data
});

// 更新文件夹
export const updateFolder = (data) => ({
  url: `/configVersion/updateFolder`,
  method: 'post',
  data
});

// 保存文件
export const saveFile = (data) => ({
  url: `/configVersion/saveFile`,
  method: 'post',
  data
});

// 回滚历史文件
export const rollback = (data) => ({
  url: `/configVersion/rollback`,
  method: 'post',
  data
});
