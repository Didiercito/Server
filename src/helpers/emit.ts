import InterfaceDataResponse from "../interface/heart_rate";

export const emitSocket = (data: any) => {

    if (data && typeof data.ECG === 'number') {
        const send: Array<InterfaceDataResponse> = [
            { 
                datos: 'Ritmo Cardiaco', 
                informacion: data.ECG  
            }
        ];
        return send;
    } else {
        console.error('Error: la propiedad "ECG" es undefined o no es un número');
        return [];
    }
};
