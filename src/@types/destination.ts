export interface Destination {
    id: string;
    destinatario?: string | null;
    rua: string | null;
    numero: string | null;
    bairro?: string | null;
    cidade: string | null;
    estado: string | null;
    complemento?: string | null;
}