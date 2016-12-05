const key = 'AIzaSyCPxD0CWE2jQf5iWYq9N3SoaI2OYEszB-w';

export default {
  getImageUrl(photoReference) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${key}`;
  },
};
