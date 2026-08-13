import { useRef, useState } from "react";
import {
    Image,
    Modal,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    CameraView,
    useCameraPermissions,
} from "expo-camera";

import { styles } from "./styles";

interface CameraModalProps {
    visible: boolean;
    onClose: () => void;
    onPhotoTaken: (uri: string) => void;
}

export function CameraModal({
    visible,
    onClose,
    onPhotoTaken,
}: CameraModalProps) {
    const [permission, requestPermission] =
        useCameraPermissions();

    const [cameraReady, setCameraReady] =
        useState(false);

    const [photoUri, setPhotoUri] =
        useState<string | null>(null);

    const cameraRef = useRef<CameraView>(null);

    async function handleTakePhoto() {
        if (!cameraRef.current || !cameraReady) {
            return;
        }

        try {
            const photo =
                await cameraRef.current.takePictureAsync({
                    quality: 0.8,
                });

            if (photo?.uri) {
                setPhotoUri(photo.uri);
            }
        } catch (error) {
            console.log(
                "Erro ao tirar foto:",
                error
            );
        }
    }

    async function handleRequestPermission() {
        await requestPermission();
    }

    function handleClose() {
        setPhotoUri(null);
        setCameraReady(false);
        onClose();
    }

    function handleRetake() {
        setPhotoUri(null);
        setCameraReady(false);
    }

    function handleUsePhoto() {
        if (!photoUri) {
            return;
        }

        onPhotoTaken(photoUri);
        setPhotoUri(null);
        setCameraReady(false);
    }

    if (!permission) {
        return null;
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={handleClose}
        >
            <SafeAreaView style={styles.container}>
                {!permission.granted ? (
                    <View
                        style={styles.permissionContainer}
                    >
                        <Text
                            style={styles.permissionTitle}
                        >
                            Acesso à câmera
                        </Text>

                        <Text
                            style={styles.permissionText}
                        >
                            Precisamos acessar sua câmera
                            para fotografar a etiqueta
                            da encomenda.
                        </Text>

                        <TouchableOpacity
                            style={
                                styles.permissionButton
                            }
                            onPress={
                                handleRequestPermission
                            }
                        >
                            <Text
                                style={styles.buttonText}
                            >
                                Permitir câmera
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={handleClose}
                        >
                            <Text
                                style={styles.cancelText}
                            >
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : photoUri ? (
                    <View style={styles.previewContainer}>
                        <Image
                            source={{ uri: photoUri }}
                            style={styles.previewImage}
                            resizeMode="contain"
                        />

                        <View
                            style={styles.previewActions}
                        >
                            <TouchableOpacity
                                style={
                                    styles.retakeButton
                                }
                                onPress={handleRetake}
                            >
                                <Text
                                    style={
                                        styles.retakeText
                                    }
                                >
                                    Tirar novamente
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.useButton}
                                onPress={handleUsePhoto}
                            >
                                <Text
                                    style={styles.useText}
                                >
                                    Usar foto
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View
                        style={styles.cameraContainer}
                    >
                        <CameraView
                            ref={cameraRef}
                            style={styles.camera}
                            facing="back"
                            onCameraReady={() =>
                                setCameraReady(true)
                            }
                        />

                        <View style={styles.overlay}>
                            <TouchableOpacity
                                style={
                                    styles.closeButton
                                }
                                onPress={handleClose}
                            >
                                <Text
                                    style={
                                        styles.closeText
                                    }
                                >
                                    ×
                                </Text>
                            </TouchableOpacity>

                            <View
                                style={
                                    styles.instructionContainer
                                }
                            >
                                <Text
                                    style={
                                        styles.instructionTitle
                                    }
                                >
                                    Fotografe a etiqueta
                                </Text>

                                <Text
                                    style={
                                        styles.instructionText
                                    }
                                >
                                    Enquadre o endereço da
                                    encomenda dentro da
                                    área.
                                </Text>
                            </View>

                            <View
                                style={
                                    styles.captureContainer
                                }
                            >
                                <TouchableOpacity
                                    style={
                                        styles.captureButton
                                    }
                                    onPress={
                                        handleTakePhoto
                                    }
                                >
                                    <View
                                        style={
                                            styles.captureButtonInner
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </Modal>
    );
}