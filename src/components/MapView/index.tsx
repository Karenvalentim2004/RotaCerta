import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Text,
    View,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

import { colors } from "../../theme/colors";
import { styles } from "./styles";

export function MapPreview() {
    const [location, setLocation] =
        useState<Location.LocationObject | null>(null);

    const [loading, setLoading] = useState(true);

    async function getLocation() {
        try {
            const { status } =
                await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                setLoading(false);
                return;
            }

            const currentLocation =
                await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });

            setLocation(currentLocation);
        } catch (error) {
            console.log(
                "Erro ao obter localização:",
                error
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getLocation();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    size="small"
                    color={colors.green[600]}
                />

                <Text style={styles.loadingText}>
                    Obtendo localização...
                </Text>
            </View>
        );
    }

    if (!location) {
        return null;
    }

    const { latitude, longitude } =
        location.coords;

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                showsUserLocation
                showsMyLocationButton
            >
                <Marker
                    coordinate={{
                        latitude,
                        longitude,
                    }}
                    title="Minha localização"
                />
            </MapView>
        </View>
    );
}