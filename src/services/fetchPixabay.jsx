import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api/`;
axios.defaults.params = {
  key: `31807815-f192f6f9aa73198d509365ba4`,
};

export const fetchPixabay = async (page = 1, search) => {
  try {
    const { data } = await axios.get(
      `?q=${search}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    );
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error('Oops, there is no images');
  }
};
