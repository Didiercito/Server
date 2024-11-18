import OximeterResponse from "../interface/oximeter";

export const emitOximeterSocket = (data: any) => {
    if (data && typeof data.valor === "number") {
        const send: Array<OximeterResponse> = [
            {
                datos: "Oxigenación en Sangre",
                informacion: data.valor,
            },
        ];
        console.log("Datos enviados (Oximeter):", send);
        return send;
    } else {
        console.error('Error: la propiedad "valor" es undefined o no es un número');
        return [];
    }
};
