import AsyncStorage from "@react-native-async-storage/async-storage";

const VEHICLES_KEY = "@routeapp:vehicles";

export interface Vehicle {
    id: string;
    tipo: string;
    modelo: string;
    consumo: string;
    combustivel: string;
}

export async function saveVehicles(
    vehicles: Vehicle[]
) {
    await AsyncStorage.setItem(
        VEHICLES_KEY,
        JSON.stringify(vehicles)
    );
}

export async function getVehicles(): Promise<Vehicle[]> {
    const data =
        await AsyncStorage.getItem(VEHICLES_KEY);

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}