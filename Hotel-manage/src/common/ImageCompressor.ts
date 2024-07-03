import imageCompression from "browser-image-compression";
import ImageConverter from "./ImageConverter";

//more to use check npm
export class ImageCompressor {
    public maxSizeMB: number = 2;

    public useWebWorker: boolean = true;

    public preserveExif: boolean = true;

    public maxIteration: number = 10;

    public Compress = async (
        file: File,
        onSuccess: (base64: string) => void,
        onfail: (err: any) => void,
        onProgress: (progress: number) => void
    ) => {
        try {
            const File = await imageCompression(file, {
                maxSizeMB: this.maxSizeMB,
                useWebWorker: this.useWebWorker,
                preserveExif: this.preserveExif,
                maxIteration: this.maxIteration,
                onProgress: (progress: number) => {
                    onProgress(progress);
                },
            });
            await ImageConverter.toBase64(File).then((base64: any) =>
                onSuccess(base64)
            );
        } catch (error: any) {
            onfail(error.message);
        }
    };
}
