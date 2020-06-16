import * as Comlink from 'comlink';
import Jimp, { read } from 'jimp';

export type IWorker = {
    counter: number,
    inc: ()=>void,
    grey: (f: File | Blob , blur:number) => Promise<string>
}

function greyScaleImage(f: File | Blob , blur:number) : Promise<string>{
    return new Promise<string>((ok,bad)=>{
        let reader = new FileReader();
        reader.onloadend = async function () {
            try {
                let imageB64 = reader.result as string;
                //setImgSrc();

                let buffer = new Buffer(imageB64.replace(/^data:image\/\w+;base64,/, ""),'base64');
                let img = await Jimp.read(buffer);
                img.greyscale().posterize(256)
                if (blur > 0) {
                    img.blur(blur)
                }
                var greyScalestring = await img.getBase64Async(Jimp.MIME_PNG);
                ok(greyScalestring);
            } catch (error) {
                bad();
            }
        }
        reader.onerror = () => {
            bad();
        }
        reader.readAsDataURL(f);
    })
}

const obj : IWorker = {
  counter: 0,
  inc() {
    this.counter++;
    console.log(this.counter);
  },
  grey : greyScaleImage
};

Comlink.expose(obj);