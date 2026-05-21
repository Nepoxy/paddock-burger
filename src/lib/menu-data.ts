import burgerFerrari from "@/assets/burger-ferrari.jpg";
import burgerLambo from "@/assets/burger-lamborghini.jpg";
import burgerAlfa from "@/assets/burger-alfaromeo.jpg";
import drink488s from "@/assets/drink-ferrari-488spider.png";
import drink488p from "@/assets/drink-ferrari-488pista.png";
import drinkF40 from "@/assets/drink-ferrari-f40.png";
import drinkAvent from "@/assets/drink-lambo-aventador.png";
import drinkGall from "@/assets/drink-lambo-gallardo.png";
import drinkCount from "@/assets/drink-lambo-countach.png";
import drinkGiulia from "@/assets/drink-alfa-giulia.png";
import drinkGiulietta from "@/assets/drink-alfa-giulietta.png";
import drink8c from "@/assets/drink-alfa-8c.png";

export type Brand = "ferrari" | "lamborghini" | "alfa";

export type Burger = {
  id: string;
  name: string;
  brand: Brand;
  tagline: string;
  description: string;
  ingredients: string[];
  price: number;
  image: string;
  // variable options
  cuissons: string[];
  supplements: { id: string; label: string; price: number }[];
};

export type Drink = {
  id: string;
  name: string;
  brand: Brand;
  description: string;
  price: number;
  image: string;
};

export const burgers: Burger[] = [
  {
    id: "ferrari",
    name: "La Ferrari",
    brand: "ferrari",
    tagline: "Rosso Corsa — la signature",
    description: "Bun brioché doré au cavallino, double bœuf maturé, cheddar fondu, oignons confits au Lambrusco, sauce piquante calabraise.",
    ingredients: ["Pain brioché signé", "2× steak bœuf 150g", "Cheddar affiné", "Oignons rouges confits", "Sauce 'arrabbiata'", "Roquette"],
    price: 16.9,
    image: burgerFerrari,
    cuissons: ["Saignant", "À point", "Bien cuit"],
    supplements: [
      { id: "bacon", label: "Bacon croustillant", price: 1.5 },
      { id: "cheddar", label: "Double cheddar", price: 1.5 },
      { id: "truffe", label: "Sauce truffe", price: 2.5 },
    ],
  },
  {
    id: "lamborghini",
    name: "Le Lamborghini",
    brand: "lamborghini",
    tagline: "Nero & Oro — la bête",
    description: "Bun charbon noir au taureau d'or, steak bœuf Black Angus 200g, cheddar mature, oignons caramélisés au miel, sauce BBQ fumée.",
    ingredients: ["Pain charbon noir", "Steak Black Angus 200g", "Cheddar mature", "Oignons caramélisés", "Sauce BBQ fumée", "Pickles maison"],
    price: 17.9,
    image: burgerLambo,
    cuissons: ["Saignant", "À point", "Bien cuit"],
    supplements: [
      { id: "egg", label: "Œuf miroir", price: 1.5 },
      { id: "cheddar", label: "Double cheddar", price: 1.5 },
      { id: "truffe", label: "Sauce truffe", price: 2.5 },
    ],
  },
  {
    id: "alfa",
    name: "L'Alfa Romeo",
    brand: "alfa",
    tagline: "Verde Bianco Rosso — l'italienne",
    description: "Bun brioché au Biscione, steak bœuf 180g, mozzarella fior di latte, tomates confites, pesto basilic frais.",
    ingredients: ["Pain brioché signé", "Steak bœuf 180g", "Mozzarella fior di latte", "Tomates confites", "Pesto Genovese", "Roquette"],
    price: 16.9,
    image: burgerAlfa,
    cuissons: ["Saignant", "À point", "Bien cuit"],
    supplements: [
      { id: "burrata", label: "Burrata crémeuse", price: 2.5 },
      { id: "jambon", label: "Jambon de Parme", price: 2.5 },
      { id: "pesto", label: "Extra pesto", price: 1.0 },
    ],
  },
];

export const drinks: Drink[] = [
  { id: "ferrari-488s", name: "Ferrari 488 Spider Gusto", brand: "ferrari", description: "Soda énergisant cerise & agrumes rouges", price: 4.5, image: drink488s },
  { id: "ferrari-488p", name: "Ferrari 488 Pista Gusto", brand: "ferrari", description: "Soda énergisant grenade & guarana", price: 4.5, image: drink488p },
  { id: "ferrari-f40", name: "Ferrari F40 Gusto", brand: "ferrari", description: "Cola premium italien recette 1987", price: 4.5, image: drinkF40 },
  { id: "lambo-avent", name: "Lamborghini Aventador", brand: "lamborghini", description: "Energy drink doré, taurine & ginseng", price: 4.9, image: drinkAvent },
  { id: "lambo-gall", name: "Lamborghini Gallardo", brand: "lamborghini", description: "Energy drink mangue & fruits exotiques", price: 4.9, image: drinkGall },
  { id: "lambo-count", name: "Lamborghini Countach", brand: "lamborghini", description: "Energy drink classique torréfié", price: 4.9, image: drinkCount },
  { id: "alfa-giulia", name: "Alfa Romeo Giulia", brand: "alfa", description: "Limonade artisanale citron de Sicile", price: 4.5, image: drinkGiulia },
  { id: "alfa-giulietta", name: "Alfa Romeo Giulietta", brand: "alfa", description: "Spritz sans alcool orange sanguine", price: 4.5, image: drinkGiulietta },
  { id: "alfa-8c", name: "Alfa Romeo 8C", brand: "alfa", description: "Chinotto italien — amer & raffiné", price: 4.5, image: drink8c },
];

export const sauces = [
  { id: "ketchup", label: "Ketchup maison", price: 0.8 },
  { id: "mayo", label: "Mayonnaise truffée", price: 1.2 },
  { id: "bbq", label: "BBQ fumée", price: 0.8 },
  { id: "pesto", label: "Pesto Genovese", price: 1.2 },
  { id: "arrabbiata", label: "Arrabbiata piquante", price: 1.0 },
];

export const sides = [
  { id: "fries", label: "Frites maison", price: 4.5 },
  { id: "fries-truffe", label: "Frites à la truffe", price: 6.9 },
  { id: "wedges", label: "Potatoes parmesan", price: 5.5 },
  { id: "tiramisu", label: "Tiramisu maison", price: 5.9 },
];

// Zone de livraison (codes postaux desservis)
export const DELIVERY_ZIPS = ["75001","75002","75008","75009","75016","75017","92100","92200","92300","92400","92500"];
export const RESTAURANT = {
  name: "Paddock Burgers",
  address: "12 Via dei Motori, 75008 Paris",
  phone: "+33 1 42 00 00 00",
  hours: "Mar–Dim · 11h30 – 14h30 / 18h30 – 22h30 (Fermé lundi)",
};
