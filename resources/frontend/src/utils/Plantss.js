const plantImages = import.meta.glob("../assets/plants/*.jpg", { eager: true });

const plantss = Object.values(plantImages).map((mod) => mod.default);

export default plantss;
