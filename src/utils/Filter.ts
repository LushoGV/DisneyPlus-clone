import movies from "../api/movies.json";

interface params {
  type?: string;
  companyCode?: string;
  filter?: string;
  id?: number;
  quantity?: number
}

export const filterData = ({ type, companyCode, filter, id, quantity }: params) => {
  let data = movies.filter(
    (element) => element.backdrop_path !== null && element.poster_path !== null
  );

  if (type) {
    data = data.filter((element) =>
      type === "movie" || type === "movies"
        ? !element.first_air_date
        : element.first_air_date
    );
  }

  if (companyCode) {
    data = data.filter((element) => element.company === (companyCode.toString()));
  }

  if (filter) {
    switch (filter) {
      case "popularity":
        data = data.sort((a, b) => {
          if (
            Math.round((a.vote_count * a.vote_average) / 0.1) <
            Math.round((b.vote_count * b.vote_average) / 0.1)
          ) {
            return 1;
          }
          if (
            Math.round((a.vote_count * a.vote_average) / 0.1) >
            Math.round((b.vote_count * b.vote_average) / 0.1)
          ) {
            return -1;
          }
          return 0;
        });
        break;

      case "a-z":
        data = data.sort((a, b) => {
          if (
            (a.title && b.title && a.title > b.title) ||
            (a.name && b.name && a.name > b.name)
          ) {
            return 1;
          }
          if (
            (a.title && b.title && a.title < b.title) ||
            (a.name && b.name && a.name < b.name)
          ) {
            return -1;
          }
          return 0;
        });
        break;

      case "z-a":
        data = data.sort((a, b) => {
          if (
            (a.title && b.title && a.title > b.title) ||
            (a.name && b.name && a.name > b.name)
          ) {
            return 1;
          }
          if (
            (a.title && b.title && a.title < b.title) ||
            (a.name && b.name && a.name < b.name)
          ) {
            return -1;
          }
          return 0;
        });
        break;

      case "recommended":
        data = data.filter((element) => element.id !== id).sort(()=> Math.random() - 0.5)
        break;

      case "featured":
        data.sort((a, b) => {
          if (a.popularity < b.popularity) {
            return 1;
          }
          if (a.popularity > b.popularity) {
            return -1;
          }
          return 0;
        });
        break;

      case "action/adventure":
        data = data.filter(
          (element) =>
            element.genre_ids.includes(12) || element.genre_ids.includes(28)
        );
        break;

      case "animation":
        data = data.filter((element) => element.genre_ids.includes(16));
        break;

      case "comedy":
        data = data.filter((element) => element.genre_ids.includes(35));
        break;

      case "drama":
        data = data.filter((element) => element.genre_ids.includes(18));
        break;

      default:
        break;
    }
  }

  return quantity && quantity <= data.length ? data.slice(0, quantity) : data.slice(0, 16);
};
