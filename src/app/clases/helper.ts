import { Injectable } from '@angular/core';



@Injectable()
export class Helper {



    public static readonly RMS_FACTOR = 2 * Math.sqrt(2);

    constructor() {

    }




    // ---------------funciones matematicas-----------------
    /**
     * redondea el numero de decimales
     * @param posiciones numero de decimales
     */
    public trunc(x, posiciones: number) {
        const s = x.toString();
        const l = s.length;
        const decimalLength = s.indexOf('.') + 1;
        if (decimalLength !== 0) {
            const numStr = s.substr(0, decimalLength + posiciones);
            return Number(numStr);
        } else {       
            return x;
        }
    }
    /**
     * redondeda a la decena mas proxima;
     */
    public redondea10(v: number) {
        v /= 10;
        v = Math.round(v);
        return v *= 10;
    }

    public redondea50(v: number) {
        v /= 50;
        v = Math.round(v);
        return v *= 50;
    }
}
