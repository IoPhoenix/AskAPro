
// function to import all images from certain folder:
export default function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[index + 1] = r(item); });
    return images;
}