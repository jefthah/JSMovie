import axios from "axios";

const apiKey = process.env.REACT_APP_APIKEY;
const baseUrl = process.env.REACT_APP_BASEURL;

export const getMovieList = async () => {
  try {
    const movie = await axios.get(`${baseUrl}/movie/now_playing?api_key=${apiKey}`);
    console.log({ movieList: movie.data.results }); // Mengeluarkan movieList ke konsol
    return movie.data.results;
  } catch (error) {
    throw error;
  }
};

export const searchMovie = async (title) => {
    const response = await axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${title}`);
    return response.data.results;
  };
