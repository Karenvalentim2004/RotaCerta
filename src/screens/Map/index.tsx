import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

import { styles } from "./styles";
import { colors } from "@/theme/colors";

export function Map() {
    const [location, setLocation] =
        useState<Location.LocationObject | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    async function getCurrentLocation() {
        try {
            setLoading(true);
            setError(null);

            const { status } =
                await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                setError(
                    "Precisamos da sua localização para mostrar o mapa."
                );

                return;
            }

            const currentLocation =
                await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });

            setLocation(currentLocation);
        } catch (error) {
            console.error(
                "Erro ao obter localização:",
                error
            );

            setError(
                "Não foi possível obter sua localização."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCurrentLocation();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    size="large"
                    color={colors.green[600]}
                />

                <Text style={styles.loadingText}>
                    Obtendo sua localização...
                </Text>
            </View>
        );
    }

    if (error || !location) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                    {error}
                </Text>
            </View>
        );
    }

    const { latitude, longitude } =
        location.coords;

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation
                showsMyLocationButton
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{
                        latitude,
                        longitude,
                    }}
                    title="Minha localização"
                    description="Localização atual"
                />
            </MapView>
        </View>
    );
}