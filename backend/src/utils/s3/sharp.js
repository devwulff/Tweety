import sharp from 'sharp';
import fs from 'fs';
import { resolve } from 'path';

export const resizeAvatar = async ({ path, destination, filename }) => {
    return new Promise(resolve => {

        const inputFile = path;

        const outputFile = `${destination}/avatar${filename}`;

        sharp(inputFile).resize({ width: 400 }).toFile(outputFile)
            .then(function (newFileInfo) {
                // newFileInfo holds the output file properties
                console.log("Success")
                resolve(`${destination}/avatar${filename}`);
            })
            .catch(function (err) {
                console.log("Error occured");
            });

    })

}





// export const resizeAvatar = async ({ path, destination, filename }) => {
//     return new Promise(resolve => {

//         // input stream
//         const inStream = fs.createReadStream(path);

//         // output stream
//         const outStream = fs.createWriteStream(`${destination}/avatar${filename}`, { flags: "w" });

//         outStream.on('error', function () {
//             console.log("Error");
//         });

//         outStream.on('close', function () {
//             console.log("Successfully saved file");
//         });

//         // input stream transformer
//         // "info" event will be emitted on resize
//         const transform = sharp()
//             .resize({ width: 300 })
//             .on('info', function (fileInfo) {
//                 console.log("Resizing done, file not saved");
//             });

//         inStream.pipe(transform).pipe(outStream);

//         resolve(`${destination}/avatar${filename}`);
//     })

// }