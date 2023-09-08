import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        name: 'home',
        path: '/',
        meta: {title: '首页'},
        component: () => import('@/views/Home.vue'),
    },
    {
        name: 'login',
        path: '/login',
        meta: {title: '用户登录'},
        component: () => import('@/views/Login.vue'),
    },
    {
        name: 'register',
        path: '/register',

        meta: {title: '用户注册'},
        component: () => import('@/views/Register.vue'),
    },
    {
        name: 'chat',
        path: '/chat',
        meta: {title: '创作中心'},
        component: () => import('@/views/ChatPlus.vue'),
    },
    {
        name: 'chat-id',
        path: '/chat/:id',
        meta: {title: '创作中心'},
        component: () => import('@/views/ChatPlus.vue'),
        props: true // 将路由参数传递给组件的 props
    },
    {
        name: 'chat-export',
        path: '/chat/export',
        meta: {title: '导出会话记录'},
        component: () => import('@/views/ChatExport.vue'),
    },
    {
        path: '/ablyy/login',
        name: 'ablyy-login',
        meta: {title: 'Chat-Plus 控制台登录'},
        component: () => import('@/views/admin/Login.vue'),
    },
    {
        name: 'ablyy',
        path: '/ablyy',
        redirect: '/ablyy/dashboard',
        component: () => import("@/views/admin/Home.vue"),
        meta: {title: 'Ablyy-智能助手 管理后台'},
        children: [
            {
                path: '/ablyy/dashboard',
                name: 'ablyy-dashboard',
                meta: {title: '仪表盘'},
                component: () => import('@/views/admin/Dashboard.vue'),
            },
            {
                path: '/ablyy/system',
                name: 'ablyy-system',
                meta: {title: '系统设置'},
                component: () => import('@/views/admin/SysConfig.vue'),
            },
            {
                path: '/ablyy/user',
                name: 'ablyy-user',
                meta: {title: '用户管理'},
                component: () => import('@/views/admin/UserList.vue'),
            },
            {
                path: '/ablyy/role',
                name: 'ablyy-role',
                meta: {title: '角色管理'},
                component: () => import('@/views/admin/RoleList.vue'),
            },
            {
                path: '/ablyy/apikey',
                name: 'ablyy-apikey',
                meta: {title: 'API-KEY 管理'},
                component: () => import('@/views/admin/ApiKey.vue'),
            },
            {
                path: '/ablyy/chat/model',
                name: 'ablyy-chat-model',
                meta: {title: '语言模型'},
                component: () => import('@/views/admin/ChatModel.vue'),
            },
            {
                path: '/ablyy/loginLog',
                name: 'ablyy-loginLog',
                meta: {title: '登录日志'},
                component: () => import('@/views/admin/LoginLog.vue'),
            },
            {
                path: '/ablyy/demo/form',
                name: 'ablyy-form',
                meta: {title: '表单页面'},
                component: () => import('@/views/admin/demo/Form.vue'),
            },
            {
                path: '/ablyy/demo/table',
                name: 'ablyy-table',
                meta: {title: '数据列表'},
                component: () => import('@/views/admin/demo/Table.vue'),
            },
            {
                path: '/ablyy/demo/import',
                name: 'ablyy-import',
                meta: {title: '导入数据'},
                component: () => import('@/views/admin/demo/Import.vue'),
            },
            {
                path: '/ablyy/demo/editor',
                name: 'ablyy-editor',
                meta: {title: '富文本编辑器'},
                component: () => import('@/views/admin/demo/Editor.vue'),
            },
        ]
    },

    {
        path: '/mobile/chat/session',
        name: 'mobile-chat-session',
        component: () => import('@/views/mobile/ChatSession.vue'),
    },
    {
        name: 'mobile',
        path: '/mobile',
        meta: {title: 'Ablyy-智能助手'},
        component: () => import('@/views/mobile/Home.vue'),
        redirect: '/mobile/chat/list',
        children: [
            {
                path: '/mobile/chat/list',
                name: 'mobile-chat-list',
                component: () => import('@/views/mobile/ChatList.vue'),
            },
            {
                path: '/mobile/setting',
                name: 'mobile-setting',
                component: () => import('@/views/mobile/Setting.vue'),
            },
            {
                path: '/mobile/profile',
                name: 'mobile-profile',
                component: () => import('@/views/mobile/Profile.vue'),
            },
        ]
    },
    {
        name: 'test',
        path: '/test',
        meta: {title: '测试页面'},
        component: () => import('@/views/Test.vue'),
    },
    {
        name: 'NotFound',
        path: '/:all(.*)',
        meta: {title: '页面没有找到'},
        component: () => import('@/views/404.vue'),
    },
]

// console.log(MY_VARIABLE)
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

// dynamic change the title when router change
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = `${to.meta.title} | ${process.env.VUE_APP_TITLE}`
    }
    next()
})

export default router;