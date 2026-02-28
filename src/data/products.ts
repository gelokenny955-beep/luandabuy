import fonesImg from "@/assets/products/fones-bluetooth.jpg";
import smartphoneImg from "@/assets/products/smartphone.jpg";
import bolsaImg from "@/assets/products/bolsa-feminina.jpg";
import tenisImg from "@/assets/products/tenis-esportivo.jpg";
import relogioImg from "@/assets/products/relogio.jpg";
import laptopImg from "@/assets/products/laptop.jpg";
import oculosImg from "@/assets/products/oculos.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  seller: string;
  location: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Fones Bluetooth Sem Fio",
    price: 9900,
    image: fonesImg,
    category: "Tecnologia",
    description: "Fones de ouvido Bluetooth 5.0 com cancelamento de ruído, bateria de longa duração e som de alta qualidade. Perfeito para o dia a dia.",
    rating: 4.5,
    reviews: 128,
    seller: "TechStore Luanda",
    location: "Talatona",
  },
  {
    id: "2",
    name: "Smartphone Android 13",
    price: 124990,
    image: smartphoneImg,
    category: "Tecnologia",
    description: "Smartphone com tela AMOLED de 6.5 polegadas, câmera tripla de 108MP, 8GB RAM e 256GB de armazenamento.",
    rating: 4.7,
    reviews: 256,
    seller: "Mobile Angola",
    location: "Maianga",
  },
  {
    id: "3",
    name: "Bolsa Feminina Premium",
    price: 15900,
    image: bolsaImg,
    category: "Moda",
    description: "Bolsa feminina em couro sintético de alta qualidade. Design elegante com múltiplos compartimentos.",
    rating: 4.3,
    reviews: 89,
    seller: "Fashion Luanda",
    location: "Viana",
  },
  {
    id: "4",
    name: "Tênis Esportivo Running",
    price: 33500,
    image: tenisImg,
    category: "Calçados",
    description: "Tênis esportivo com tecnologia de amortecimento avançada. Leve, confortável e perfeito para corrida.",
    rating: 4.6,
    reviews: 167,
    seller: "SportZone AO",
    location: "Kilamba",
  },
  {
    id: "5",
    name: "Relógio Masculino Clássico",
    price: 28900,
    image: relogioImg,
    category: "Acessórios",
    description: "Relógio masculino em aço inoxidável com mostrador analógico. Resistente à água, elegante para todas as ocasiões.",
    rating: 4.4,
    reviews: 73,
    seller: "Watch House",
    location: "Talatona",
  },
  {
    id: "6",
    name: "Laptop Notebook 15.6\"",
    price: 289000,
    image: laptopImg,
    category: "Tecnologia",
    description: "Notebook com processador de última geração, 16GB RAM, SSD 512GB. Ideal para trabalho e entretenimento.",
    rating: 4.8,
    reviews: 45,
    seller: "CompuTech AO",
    location: "Maianga",
  },
  {
    id: "7",
    name: "Óculos de Sol Aviador",
    price: 12500,
    image: oculosImg,
    category: "Acessórios",
    description: "Óculos de sol estilo aviador com proteção UV400. Armação metálica leve e durável.",
    rating: 4.2,
    reviews: 94,
    seller: "Ótica Luanda",
    location: "Ingombota",
  },
  {
    id: "8",
    name: "Fones Bluetooth Pro",
    price: 19900,
    image: fonesImg,
    category: "Tecnologia",
    description: "Versão premium dos fones Bluetooth com ANC ativo, 30h de bateria e qualidade de áudio Hi-Fi.",
    rating: 4.9,
    reviews: 312,
    seller: "TechStore Luanda",
    location: "Talatona",
  },
];

export const categories = [
  "Todos",
  "Tecnologia",
  "Moda",
  "Calçados",
  "Acessórios",
  "Casa & Jardim",
  "Beleza",
  "Desporto",
];

export function formatPrice(price: number): string {
  return `Kz ${price.toLocaleString("pt-AO")}`;
}
