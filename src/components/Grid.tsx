import MovieCard from "./MovieCard";

const Grid = () => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 gap-x-4 pb-24">
      <li><MovieCard type="grid"/></li>
      <li><MovieCard type="grid"/></li>
      <li><MovieCard type="grid"/></li>
      <li><MovieCard type="grid"/></li>
      <li><MovieCard type="grid"/></li>
      <li><MovieCard type="grid"/></li>
      <li><MovieCard type="grid"/></li>
      <li><MovieCard type="grid"/></li>
      <li><MovieCard type="grid"/></li>
      <li><MovieCard type="grid"/></li>
      <li><MovieCard type="grid"/></li>
      <li><MovieCard type="grid"/></li>
    </ul>
  );
};

export default Grid;
