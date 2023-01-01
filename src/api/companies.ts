const companies = [
  {
    name: "disney",
    video:
      "https://vod-bgc-sa-east-1.media.dssott.com/bgui/ps01/disney/bgui/2021/11/04/1636056497-disney.mp4",
    image:
      "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/61C377B14F25252D8A112D23A89A78516435DCF60F1C151854DE3D91C755A11A/scale?width=1440&aspectRatio=1.78&format=jpeg",
    code: "2",
  },
  {
    name: "pixar",
    video:
      "https://vod-bgc-sa-east-1.media.dssott.com/bgui/ps01/disney/bgui/2021/11/04/1636056639-pixar.mp4",
    image:
      "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/0CF86F6F281176EFE2F22314CB713B3AFE515C4291EA9AFC6546F1FE42EFB756/scale?width=1440&aspectRatio=1.78&format=jpeg",
    code: "3",
  },
  {
    name: "marvel",
    video:
      "https://vod-bgc-sa-east-1.media.dssott.com/bgui/ps01/disney/bgui/2021/11/04/1636056889-marvel.mp4",
    image:
      "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/DA2E198288BFCA56AB53340211B38DE7134E40E4521EDCAFE6FFB8CD69250DE9/scale?width=1440&aspectRatio=1.78&format=jpeg",
    code: "420",
  },
  {
    name: "starwars",
    image:
      "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/5A92131654C1E0B1A4C072A327E49FB30CA8BDED279852FB32CAD9B33B4AAAB1/scale?width=1440&aspectRatio=1.78&format=jpeg",
    video:
      "https://vod-bgc-sa-east-1.media.dssott.com/bgui/ps01/disney/bgui/2021/11/04/1636056809-star-wars.mp4",
    code: "1",
  },
  {
    name: "national-geographic",
    image:
      "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/368CF25E5033AC11C828B2AA2B113942743175E35C5AA7A4F6F6F39E70E5B204/scale?width=1440&aspectRatio=1.78&format=jpeg",
    video:
      "https://vod-bgc-sa-east-1.media.dssott.com/bgui/ps01/disney/bgui/2021/11/04/1636056567-national-geographic.mp4",
    code: "7521",
  },
];

export const companiesCodes = companies.map(element =>  element.code)

export const companiesNames = companies.map(element =>  element.name)

export default companies;
