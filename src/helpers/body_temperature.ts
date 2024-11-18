import BodyTemperatureResponse from "../interface/body_temperature";

export const emitBodyTemperatureSocket = (data: any) => {
    if (data && typeof data.valor === "number") {
        const send: Array<BodyTemperatureResponse> = [
            {
                datos: "Temperatura Corporal",
                informacion: data.valor,
            },
        ];
        console.log("Datos enviados (BodyTemperature):", send);
        return send;
    } else {
        console.error('Error: la propiedad "valor" es undefined o no es un número');
        return [];
    }
};
