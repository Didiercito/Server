import AcelerometerResponse from "../interface/acelerometer";

export const emitAcelerometerSocket = (data: any) => {
    if (data && typeof data.x === "number" && typeof data.y === "number" && typeof data.z === "number") {
        const send: Array<AcelerometerResponse> = [
            {
                datos: "Acelerómetro",
                informacion: `X: ${data.x}, Y: ${data.y}, Z: ${data.z}`,
            },
        ];
        console.log("Datos enviados (Acelerómetro):", send);
        return send;
    } else {
        console.error('Error: las propiedades "x", "y" o "z" son undefined o no son números');
        return [];
    }
};
