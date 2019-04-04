import App from '../App'
const home = r => require.ensure([], () => r(require('../page/main/main')), 'home') //主页
const browselist = r => require.ensure([], () => r(require('../page/browse/browselist')), 'browselist') //浏览
const maintest = r => require.ensure([], () => r(require('../page/test/test')), 'maintest')
const test = r => require.ensure([], () => r(require('../page/test/test')), 'test')
const test1 = r => require.ensure([], () => r(require('../page/test/children/test1')), 'test1')
const my = r => require.ensure([], () => r(require('../page/my/my')), 'my') //我的
const Demo = r => require.ensure([], () => r(require('../page/test/Demo')), 'Demo') //demo
export default[{
  path: '/',
  component: App, //顶层路由，对应index.html
  children:[
    //地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    //主页
    {
      path: '/home',
      name:'主页',
      component: home,
      meta: { keepAlive: true }
    },
    {
      path: '/test',
      name:'测试页',
      component: maintest,
      children:[{
        path: 'test1',
        name:'子页面一',
        component: test1,
      }
      ]
    },

    {
      path: '/browselist',
      name:'浏览',
      component: browselist
    },
    {
      path: '/my',
      name:'我的',
      component: my
    },
    {
      path: '/Demo',
      name:'demo展示',
      component: Demo
    },
  ]
}]
