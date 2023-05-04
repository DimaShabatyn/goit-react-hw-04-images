export default function fetchPixabay(query, page = 1) {
    const API_KEY = `31807815-f192f6f9aa73198d509365ba4`;
    const URL_BASE = `https://pixabay.com/api/`;

    return fetch(
      `${URL_BASE}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (!res.ok) {
          throw new Error(
            'Sorry, there are no images matching your search. Please try again.'
          );
        }
        return res.json();
      })
      .then(data => {
        return data;
      });
}