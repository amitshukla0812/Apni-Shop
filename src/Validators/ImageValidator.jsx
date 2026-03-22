export default function ImageValidator(e) {
    let files = Array.from(e.target.files)

    if (files.length === 1) {
        let pic = files[0]
        if (!(pic.type === "image/png" || pic.type === "image/jpg" || pic.type === "image/jpeg" || pic.type === "image/gif" || pic.type === "image/webp"))
            return "Invalid pic format , allow , please upload an image to type .jpeg ,.png , .jpg ,.gif , .webp"
        else if (pic.size > 1048576)
            return "Pic is too heavy , Please upload an image upto 1 mb"
        else
            return ""
    }
    else {
        let errorMessage = []
        Array.from(e.terget.files).forEach((pic,index) => {
            if (!(pic.type === "image/png" || pic.type === "image/jpg" || pic.type === "image/jpeg" || pic.type === "image/gif" || pic.type === "image/webp"))
              errorMessage.push( `Invalid pic ${index + 1} format , allow , please upload an image to type .jpeg ,.png , .jpg ,.gif , .webp`)
            else if (pic.size > 1048576)
               errorMessage.push( `Pic ${index + 1} is too heavy , Please upload an image upto 1 mb`)
           
        })
        errorMessage.length?errorMessage.join(""):""
    }

}
