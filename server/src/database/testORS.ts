import {
    geocodeAddress,
} from "../services/orsService";

async function testORS() {
    try {

        const resultado =
            await geocodeAddress(
                "Rua Vieira Bueno, Americana, SP"
            );

        console.log(
            "✅ Endereço encontrado:"
        );

        console.log(resultado);

    } catch (error) {

        console.error(
            "❌ Erro no teste ORS:",
            error
        );
    }
}

testORS();