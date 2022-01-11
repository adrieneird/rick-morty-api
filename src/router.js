import { createWebHistory, createRouter } from 'vue-router';
import Home from './components/Home.vue'
import Characters from './components/Characters.vue'
import Character from './components/Character.vue'

/*
// Either using children route with createWebHistory('/characters') as basepath, either not having children in route
const routes = [
	{
		path: '/',
		redirect: '/characters',
		name: 'Home',
		component: {
			template: '<router-view/>',
		},
    },
    {
        path: '/characters',
        name: 'Characters',
        component: Characters,
    },
	{
		path: '/characters/:id(\\d+)',
		name: 'Character',
		component: Character,
		props: true,
	},
];*/

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
		children: [
			{
				path: '/',
				name: 'Characters',
				component: Characters,
			},
			{
				path: '/:id(\\d+)',
				name: 'Character',
				component: Character,
				// Make sure the Character id prop is treated as a number and not a string 
				props: (route) => {
					const id = Number.parseInt(route.params.id, 10)
					if (Number.isNaN(id)) {
						return 0;
					}
					return { id }
				}
			},
		],
    },
];

const router = createRouter({
    history: createWebHistory('/characters'),
    routes,
});

export default router;