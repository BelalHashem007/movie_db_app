
export interface Movie {
    id:string
    title:string
    vote_average:number
    release_date:string
    img_url:string
}

export default function Movie({movie}:{movie:Movie}){
    const imgSrc = "https://image.tmdb.org/t/p/w154"+movie.img_url;
    return (
        <div>
            <a href=""><img src={imgSrc} loading="lazy" alt={`Movie poster of ${movie.title}`} /></a>
            <a href="">{movie.title}</a>
            <p>{movie.vote_average}</p>
            <div>{movie.release_date}</div>
        </div>
    )
}