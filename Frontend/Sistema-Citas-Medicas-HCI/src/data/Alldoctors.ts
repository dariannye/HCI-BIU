import PediatriaImg from "../assets/Pediatria.jpg";
import NeumologiaImg from "../assets/Neumologia.jpg";
import CardiologiaImg from "../assets/Cardiologia.jpg";
import NutricionImg from "../assets/Nutricion.jpg";
import DermatologiaImg from "../assets/Dermatologia.jpg";
import OrtopediaImg from "../assets/Ortopedia.jpg";
import GinecologiaImg from "../assets/Ginecologia.jpg";
import OftalmologiaImg from "../assets/Oftamologia.jpg";
import OtorrinoImg from "../assets/Otorrinolaringologia.jpg";
import UrologiaImg from "../assets/Urologia.jpg";

export interface Doctor {
  id: number;
  specialty: string;
  name: string;
  contact: string;
  schedule: string;
  image: string;
}

export const doctors: Doctor[] = [
  { id: 1, specialty: "Pediatría", name: "Maria Rojas", contact: "222-359-2222", schedule: "Lunes a viernes de 8:00 am a 8:00 pm", image: PediatriaImg },
  { id: 2, specialty: "Neumología", name: "Juan Martínez", contact: "555-258-5555", schedule: "Lunes a viernes de 9:00 am a 3:00 pm", image: NeumologiaImg },
  { id: 3, specialty: "Cardiología", name: "Laura Fernández", contact: "333-111-4444", schedule: "Lunes a viernes de 9:00 am a 5:00 pm", image: CardiologiaImg },
  { id: 4, specialty: "Nutrición", name: "Juan Rivas", contact: "111-258-1111", schedule: "Lunes a viernes de 11:00 am a 4:00 pm", image: NutricionImg },
  { id: 5, specialty: "Dermatología", name: "Ana López", contact: "444-999-8888", schedule: "Martes a sábado de 10:00 am a 4:00 pm", image: DermatologiaImg },
  { id: 6, specialty: "Ortopedia", name: "Carlos Gómez", contact: "555-777-3333", schedule: "Lunes a viernes de 8:00 am a 3:00 pm", image: OrtopediaImg },
  { id: 7, specialty: "Ginecología", name: "Mariana Torres", contact: "222-444-6666", schedule: "Lunes a viernes de 9:00 am a 6:00 pm", image: GinecologiaImg },
  { id: 8, specialty: "Oftalmología", name: "Ricardo Silva", contact: "777-888-2222", schedule: "Lunes a viernes de 8:00 am a 2:00 pm", image: OftalmologiaImg },
  { id: 9, specialty: "Otorrinolaringología", name: "Paula Méndez", contact: "999-222-1111", schedule: "Lunes a viernes de 10:00 am a 5:00 pm", image: OtorrinoImg },
  { id: 10, specialty: "Urología", name: "Fernando Castro", contact: "666-123-4567", schedule: "Lunes a viernes de 12:00 pm a 7:00 pm", image: UrologiaImg },
];
