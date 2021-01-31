import { Injectable } from '@angular/core';
import { File, DirectoryEntry, FileEntry, IFile } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Injectable()
export class Helper {

    public static APP_DIRECTORY = 'tubeAmp'
    public static FOTO_DIRECTORY = 'foto'

    public static readonly RMS_FACTOR = 2 * Math.sqrt(2);
    public ExternalPath: string;
    public AppPath: string;
    public FotoPath: string;
    public FotoDirectoryEntry: DirectoryEntry;
    public AppDirectoryEntry: DirectoryEntry;



    constructor(
        private file: File,
        private webview: WebView
    ) {
        this.ExternalPath = this.file.externalRootDirectory;
        this.AppPath = this.ExternalPath + Helper.APP_DIRECTORY;
        this.FotoPath = this.AppPath + '/' + Helper.FOTO_DIRECTORY;
        this.getDirectories();
    }



    // *************************************************** FILE *******************************************************

    public async getDirectories() {
        try {
            this.AppDirectoryEntry = await this.file.createDir(this.ExternalPath, Helper.APP_DIRECTORY, false);
        } catch (err) {
            this.AppDirectoryEntry = await this.file.resolveDirectoryUrl(this.AppPath);

        }
        try {
            this.FotoDirectoryEntry = await this.file.createDir(this.AppPath, Helper.FOTO_DIRECTORY, false);
        } catch (err) {
            this.FotoDirectoryEntry = await this.file.resolveDirectoryUrl(this.FotoPath);

        }
        return this.FotoDirectoryEntry;
    }






    /**
     *  guarda en la carpeta de la app del dispositivo: tubeAmp/foto 
     *  un archivo  .jpg
     * @param file
     */
    public async saveFile(carpeta: string, name: string, file: any) {
        try {
            const fileBlob = await this.b64toBlob(file)
            return await this.file.writeFile(this.AppDirectoryEntry.nativeURL + carpeta, name, fileBlob);
        } catch (err) {
            this.showError(err);
        }
    }

    getFotoName() {
        const extension = '.jpeg';
        let time = new Date().getTime();
        return time + extension;
    }






    public async getFilePath(path: string) {
        let dir
        try {
            dir = await this.file.resolveDirectoryUrl(path);
            const res = await dir.createReader();
        } catch (err) {
            this.showError(err);
        }
        return dir;
    }


    /**
      *@param b64Data {String} Cadena base64 pura sin contentType
      *@param contentType {String} el tipo de contenido del archivo, es decir (imagen /jpeg -imagen /png -texto /plano)
      *@param sliceSize {Int} SliceSize para procesar los bytes de caracteres
      * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
      * @return Blob
      */
    public b64toBlob(b64Data, contentType?, sliceSize?) {
        contentType = contentType || 'data:image/jpeg;base64,';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }





    /**
     * lee la carpeta de fotos
     * @param arrFotos  objeto para almacenar el array de archivos
     */
    public async getFotos(arrFotos) {
        try {
            arrFotos = [];
            const res = await this.FotoDirectoryEntry.createReader();
            res.readEntries((element: FileEntry[]) => {
                if (element.length > 0) {
                    element.forEach(async element => {
                        //Convierta una URL `file: //` en una URL que sea compatible con el servidor web local en el complemento Web View.     
                        const converted = this.webview.convertFileSrc(element.nativeURL);                        
                        const file = await this.getSingleFile(element.nativeURL);
                        arrFotos.push(converted);
                    });
                }
            },
                (error) => {
                    this.showError(error);
                });
        } catch (err) {
            this.showError(err);
        }
    }



    async getSingleFile(filePath: string): Promise<File> {
        // Get FileEntry from image path
        const fileEntry: FileEntry = await this.file.resolveLocalFilesystemUrl(filePath) as FileEntry;

        // Get File from FileEntry. Again note that this file does not contain the actual file data yet.
        const cordovaFile: IFile = await this.convertFileEntryToCordovaFile(fileEntry);

        // Use FileReader on the File object to populate it with the true file contents.
        return this.convertCordovaFileToJavascriptFile(cordovaFile);
    }


    private convertFileEntryToCordovaFile(fileEntry: FileEntry): Promise<IFile> {
        return new Promise<IFile>((resolve, reject) => {
            fileEntry.file(resolve, reject);
        })
    }

    private convertCordovaFileToJavascriptFile(cordovaFile: IFile): Promise<File> {
        return new Promise<File>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.error) {
                    reject(reader.error);
                } else {
                    const blob: any = new Blob([reader.result], { type: cordovaFile.type });
                    blob.lastModifiedDate = new Date();
                    blob.name = cordovaFile.name;
                    resolve(blob as File);
                }
            };
            reader.readAsArrayBuffer(cordovaFile);
        });
    }




    // *********************************************** PLATAFORMA *****************************************************

    /*  'cordova'
        'ios'
        'android' */


    // ****************************************** funciones matematicas ***********************************************

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


    // ****************************************** util ***********************************************


    showError(err: any) {
        console.log(err);
    }

    showMsg(Msg: any) {
        console.log(Msg);
    }
}
