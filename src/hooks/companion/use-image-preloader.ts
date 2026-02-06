// import { useState, useEffect } from "react";

// export function useImagePreloader(imagePath: string, onLoad?: () => void) {
//     const [imageLoaded, setImageLoaded] = useState(false);

//     useEffect(() => {
//         const img = new Image();
//         img.src = imagePath;

//         if (img.complete) {
//             setImageLoaded(true);
//             onLoad?.();
//         } else {
//             setImageLoaded(false);
//             img.onload = () => {
//                 img.decode()
//                     .then(() => {
//                         setImageLoaded(true);
//                         onLoad?.();
//                     })
//                     .catch(() => {
//                         setImageLoaded(true);
//                         onLoad?.();
//                     });
//             };
//         }
//     }, [imagePath, onLoad]);

//     return imageLoaded;
// }