import http from './httpService';
import config from '../config.json';

export function getMovies() {
    return http.get(config.moviesEndPoint);
}

export function deleteMovie(id) {
    return http.delete(config.moviesEndPoint + '/' + id)
}