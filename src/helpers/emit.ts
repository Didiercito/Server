import InterfaceDataResponse from "../interface/data";

export const emitSocket = (data: any) => {
    console.log("Recibiendo datos:", data);  // Esto te ayudará a inspeccionar la estructura

    // Verifica si data.BPM existe y es un número
    if (data && typeof data.BPM === 'number') {
        const send: Array<InterfaceDataResponse> = [
            { 
                datos: 'Frecuencia Cardiaca', 
                informacion: data.BPM  // Aquí aseguramos que estamos pasando el número
            }
        ];
        console.log("Datos enviados:", send);
        return send;
    } else {
        console.error('Error: la propiedad "BPM" es undefined o no es un número');
        return [];
    }
};
