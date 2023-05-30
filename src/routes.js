import seriesMovie from './seriesMovie.vue'
import index from './pages/index.vue'
import movieDetail from './pages/movieDetail'
import movieWatch from './pages/movieWatch'
export default [
    {
        path: '/seriesMovie',
        component: seriesMovie
    },
    {
        path: '/',
        component: index
    },
    {
        path: '/movie/:slug',
        name: 'movie-detail',
        component: movieDetail,
        props: true
    },
    {
        path: '/movie/:slug/tap-:ep',
        name: 'movie-watch',
        component: movieWatch,
        props: true
    }
]