import { Slot } from 'expo-router';
import { SalaProvider } from './app/Context/SalaContext'; // ajuste o caminho conforme a pasta

export default function App() {
  return (
    <SalaProvider>
      <Slot />
    </SalaProvider>
  );
}
