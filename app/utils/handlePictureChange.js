export default async function handlePictureChange(e, setPictureUploadLoader, picture, setFormData) {
    const preset_key = process.env.NEXT_PUBLIC_PRESET_KEY;
    const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    const api_secret = process.env.NEXT_PUBLIC_API_SECRET;


    const file = e.target.files[0];
    const formInfo = new FormData();
    formInfo.append("file", file);
    formInfo.append("upload_preset", preset_key);
    formInfo.append("api_key", api_key);

    setPictureUploadLoader(true);
    try {
        if (picture.length !== 0 && picture.includes("cloudinary")) {
            try {
                const publicId = picture.split('/').at(-1).split('.')[0]
                const timestamp = Math.floor(Date.now() / 1000);
                const toSign = `public_id=${publicId}&timestamp=${timestamp}${api_secret}`;
                const signature = await sha256(toSign);

                const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({
                        public_id: publicId,
                        timestamp: timestamp,
                        api_key,
                        signature
                    })
                });
                const data = await res.json();
            } catch (error) {
                console.log(error.message);
                setPictureUploadLoader(false);
                return;
            }

        }
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            {
                method: "POST",
                body: formInfo,
            }
        );
        const data = await res.json();
        const transformedImageUrl = data.secure_url.replace('/image/upload/', '/image/upload/c_fill,ar_1:1,g_center/');


        if (!res.ok) {
            throw new Error("Error uploading image");
        }
        setFormData((prev) => ({
            ...prev,
            picture: transformedImageUrl,
        }));
    } catch (error) {
        console.error(error.message);
    }
    setPictureUploadLoader(false);
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}