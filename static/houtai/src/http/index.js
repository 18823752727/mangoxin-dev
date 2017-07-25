import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://localhost:3000';

let ajaxUrl = {
    // 创建文章
    createArticle: '/houtai/create-article',
    // 编辑文章
    editArticle: '/houtai/edit-article',
    // 获取文章列表
    getArticleList: '/houtai/get-article-list',
    // 获取文章数据
    getArticle: '/houtai/get-article',
    // 删除文章数据
    deleteArticle: '/houtai/delete-article'
}

axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },

  error => {
    tool.alert('请求参数错误');
    return Promise.reject(error);
  }
);

// 返回过滤器
axios.interceptors.response.use(
  // 正确处理
  res => {
    let data = res.data,
        status = data.return_code,
        msg = data.return_msg;

    if (status === 'SUCCESS') {
      return msg;
    } else {
      console.log(msg);
      return Promise.reject(msg);
    }
  },
  // 错误处理
  error => {
    let res = error.response;

    if (res) {
      console.log(res.status + ':网络错误，请刷新重试', false);
    } else {
      console.log('请求超时，请刷新重试');
    }
    return Promise.reject(error);
  }
);

// get请求方法
export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(
      res => {
        resolve(res);
      },
      error => {
        reject(error)
      }).catch((error) => {
        reject(error);
      })
  })
}

// post请求方法
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(
      res => {
        resolve(res);
      },

      error => {
        reject(error)
      }
    ).catch((error) => {
      reject(error);
    })
  })
}

export default {
    // 创建文章
    createArticle(params){
        return fetchPost(ajaxUrl.createArticle,params);
    },

    // 编辑文章
    editArticle(params){
        return fetchPost(ajaxUrl.editArticle,params);
    },
    
    // 获取文章列表
    getArticleList(params){
        return fetchGet(ajaxUrl.getArticleList,params);
    },
    
    // 删除文章
    deleteArticle(params){
        return fetchGet(ajaxUrl.deleteArticle,params);
    },

    // 获取单个文章数据
    getArticle(params){
        return fetchGet(ajaxUrl.getArticle,params);
    }
}
