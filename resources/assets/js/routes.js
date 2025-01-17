const debug = import.meta.env.VITE_APP_DEBUG === 'true';
const basePath = debug ? '' : import.meta.env.VITE_APP_BASE_PATH;

export default [
    {
        name: 'index',
        path: `${basePath}/`,
        component: () => import('./pages/index.vue')
    },
    {
        name: 'pro',
        path: `${basePath}/pro`,
        component: () => import('./pages/pro.vue'),
    },
    {
        name: 'meeting',
        path: `${basePath}/meeting/:meetingId?/:sharekey?`,
        component: () => import('./pages/meeting.vue'),
    },
    {
        name: 'manage',
        path: `${basePath}/manage`,
        component: () => import('./pages/manage.vue'),
        children: [
            {
                name: 'manage-dashboard',
                path: 'dashboard',
                component: () => import('./pages/manage/dashboard.vue'),
            },
            {
                name: 'manage-calendar',
                path: 'calendar',
                component: () => import('./pages/manage/calendar.vue'),
            },
            {
                name: 'manage-messenger',
                path: 'messenger/:dialogAction?',
                component: () => import('./pages/manage/messenger.vue'),
            },
            {
                name: 'manage-approve',//审批
                path: 'approve',
                component: () => import('./pages/manage/approve/index.vue'),
            },
            {
                name: 'manage-apps',
                path: 'apps/*',
                component: () => import('./pages/manage/apps.vue')
            },
            {
                name: 'manage-setting',
                path: 'setting',
                component: () => import('./pages/manage/setting/index.vue'),
                children: [
                    {
                        name: 'manage-setting-personal',
                        path: 'personal',
                        component: () => import('./pages/manage/setting/personal.vue'),
                    },
                    {
                        name: 'manage-setting-checkin',
                        path: 'checkin',
                        component: () => import('./pages/manage/setting/checkin.vue'),
                    },
                    {
                        name: 'manage-setting-language',
                        path: 'language',
                        component: () => import('./pages/manage/setting/language.vue'),
                    },
                    {
                        name: 'manage-setting-theme',
                        path: 'theme',
                        component: () => import('./pages/manage/setting/theme.vue'),
                    },
                    {
                        name: 'manage-setting-keyboard',
                        path: 'keyboard',
                        component: () => import('./pages/manage/setting/keyboard.vue'),
                    },
                    {
                        name: 'manage-setting-license',
                        path: 'license',
                        component: () => import('./pages/manage/setting/license.vue'),
                    },
                    {
                        name: 'manage-setting-password',
                        path: 'password',
                        component: () => import('./pages/manage/setting/password.vue'),
                    },
                    {
                        name: 'manage-setting-email',
                        path: 'email',
                        component: () => import('./pages/manage/setting/email.vue'),
                    },
                    {
                        name: 'manage-setting-system',
                        path: 'system',
                        component: () => import('./pages/manage/setting/system.vue'),
                    },
                    {
                        name: 'manage-setting-version',
                        path: 'version',
                        component: () => import('./pages/manage/setting/version.vue'),
                    },
                    {
                        name: 'manage-setting-delete',
                        path: 'delete',
                        component: () => import('./pages/manage/setting/delete.vue'),
                    },
                ]
            },
            {
                name: 'manage-project-invite',
                path: 'project/invite',
                component: () => import('./pages/manage/projectInvite.vue'),
            },
            {
                name: 'manage-project',
                path: 'project/:projectId',
                component: () => import('./pages/manage/project.vue'),
            },
            {
                name: 'manage-file',
                path: 'file/:folderId?/:fileId?',
                component: () => import('./pages/manage/file.vue'),
            },
            {
                name: 'manage-application',
                path: 'application',
                component: () => import('./pages/manage/application.vue'),
            },
        ]
    },
    {
        name: 'single-file-msg',
        path: `${basePath}/single/file/msg/:msgId`,
        component: () => import('./pages/single/fileMsg.vue'),
    },
    {
        name: 'single-file-task',
        path: `${basePath}/single/file/task/:fileId`,
        component: () => import('./pages/single/fileTask.vue'),
    },
    {
        name: 'single-file',
        path: `${basePath}/single/file/:codeOrFileId`,
        component: () => import('./pages/single/file.vue'),
    },
    {
        name: 'single-task-content',
        path: `${basePath}/single/task/content/:taskId`,
        component: () => import('./pages/single/taskContent.vue'),
    },
    {
        name: 'single-task',
        path: `${basePath}/single/task/:taskId`,
        component: () => import('./pages/single/task.vue'),
    },
    {
        name: 'single-apps',
        path: `${basePath}/single/apps/*`,
        component: () => import('./pages/single/apps.vue')
    },
    {
        name: 'single-valid-email',
        path: `${basePath}/single/valid/email`,
        component: () => import('./pages/single/validEmail.vue')
    },
    {
        name: 'single-report-edit',
        path: `${basePath}/single/report/edit/:reportEditId`,
        component: () => import('./pages/single/reportEdit.vue')
    },
    {
        name: 'single-report-detail',
        path: `${basePath}/single/report/detail/:reportDetailId`,
        component: () => import('./pages/single/reportDetail.vue')
    },
    {
        name: 'token',
        path: `${basePath}/token`,
        component: () => import('./pages/token.vue'),
    },
    {
        name: 'login',
        path: `${basePath}/login`,
        component: () => import('./pages/login.vue'),
    },
    {
        name: 'preload',
        path: `${basePath}/preload`,
        component: () => import('./pages/preload.vue')
    },
    {
        name: '404',
        path: '*',
        component: () => import('./pages/404.vue')
    }
]
