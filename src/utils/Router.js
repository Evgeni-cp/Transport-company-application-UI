import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from "@/pages/login/LoginPage";
import MainPage from "@/pages/main/MainPage";

const routes = [
        { path: '/',name:'MainPage' ,component: MainPage },
        { path: '/login',name:'LoginPage' ,component: LoginPage},
        { path: '/:pathMatch(.*)',name:'Redirect', redirect: '/' }
    ];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    if (authRequired && !loggedIn) {
        return next('/login');
    }
    next();
});

export default router;