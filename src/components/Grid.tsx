import { ILocalMovies } from "../interfaces";
import MovieCard from "./MovieCard";

interface Props {
  content: ILocalMovies[];
}

const Grid = ({ content }: Props) => {
    
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 gap-x-4 pb-24">
      {content &&
        content.map((element, index) => (
          <li key={index}>
            <MovieCard
              type="grid"
              id={element.id}
              typeLink={
                element.first_air_date || element.seasons ? "tv" : "movie"
              }
              imageLG={element.backdrop_path}
              imageMobile={element.poster_path}
            />
          </li>
        ))}
    </ul>
  );
};

export default Grid;
