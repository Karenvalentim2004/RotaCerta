import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL =
    "http://10.0.2.2:3000/api";

const TOKEN_KEY =
    "@routeapp:token";


// ==========================================
// LOGIN
// ==========================================

export async function login(
    email: string,
    senha: string
) {

    const response =
        await fetch(
            `${API_URL}/auth/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    email,
                    senha,
                }),
            }
        );


    const data =
        await response.json();


    if (!response.ok) {

        throw new Error(
            data?.error ||
            "E-mail ou senha inválidos."
        );

    }


    if (!data.token) {

        throw new Error(
            "O servidor não retornou o token."
        );

    }


    await AsyncStorage.setItem(
        TOKEN_KEY,
        data.token
    );


    return data;

}


// ==========================================
// PEGAR TOKEN
// ==========================================

export async function getToken() {

    return await AsyncStorage.getItem(
        TOKEN_KEY
    );

}


// ==========================================
// HEADERS AUTENTICADOS
// ==========================================

export async function getAuthHeaders() {

    const token =
        await getToken();


    if (!token) {

        throw new Error(
            "Usuário não autenticado."
        );

    }


    return {
        "Content-Type":
            "application/json",

        "Authorization":
            `Bearer ${token}`,
    };

}


// ==========================================
// LOGOUT
// ==========================================

export async function logout() {

    await AsyncStorage.removeItem(
        TOKEN_KEY
    );

}


// ==========================================
// VERIFICAR AUTENTICAÇÃO
// ==========================================

export async function isAuthenticated() {

    const token =
        await getToken();

    return !!token;

}