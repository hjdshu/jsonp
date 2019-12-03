## 安装
yarn add git+ssh://git@github.com:hjdshu/jsonp.git

## 使用 

### import 使用
``` javascript
  import jsonp from 'jsonp'
  jsonp({
    url: 'xxxx', // url
    callbackParamName: 'callback', // 回调函数参数名, 不填默认此字段为'jsonp'
    param: {  // 非必填, 请求的get参数，会qs处理
      a: 'abc' 
    },
    timeout: 3000  //默认为3000，不传超时时间就是3s
  }).then((res) => {
    console.log(res)
    /*
      res: {
        err: '', // err一般只有为timeout的情况
        data: {} //jsonp返回的数据
      }
    */
  })
```

### script 方式
``` html
 <script src="./dist/jsonp.js"></script>
 <script>
   jsonp({
    url: 'xxx',
    callbackParamName: 'callback', 
    param: {
      a: 'abc' 
    },
    timeout: 3000 
  }).then((res) => {
    console.log(res)
  })
 </script>
```