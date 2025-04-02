import BodyTemperatureResponse from "../interface/body_temperature";

export const emitBodyTemperatureSocket = (data: any) => {
    if (data && typeof data.valor === "number") {
        const send: Array<BodyTemperatureResponse> = [
            {
                temperature: data.valor,
            },
        ];
        console.log("Datos enviados (BodyTemperature):", send);
        return send;
    } else {
        console.error('Error: la propiedad "valor" es undefined o no es un número');
        return [];
    }
};
