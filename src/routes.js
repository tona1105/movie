import FilterMovie from './pages/FilterMovie.vue'
import index from './pages/index.vue'
import movieDetail from './pages/movieDetail'
import movieWatch from './pages/movieWatch'
export default [
    {
        path: '/',
        component: index
    },
    {
        path: '/phim/:slug',
        name: 'movie-detail',
        component: movieDetail,
        props: true
    },
    {
        path: '/phim/:slug/tap-:ep',
        name: 'movie-watch',
        component: movieWatch,
        props: true
    },
    {
        path: '/danh-sach/:slug',
        name: 'movie-list',
        component: FilterMovie,
        props: true
    }
]