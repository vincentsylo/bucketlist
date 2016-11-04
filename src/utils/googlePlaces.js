const key = 'AIzaSyDottDEdpNSNOHxXVMJda8kU4Jk0zSPvvg';

export default {
  getImageUrl(photoReference) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${key}`;
  },
};
