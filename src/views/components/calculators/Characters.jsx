export default function Characters({ img, characters, inputs, onChange }) {
    return (
        <div className="relative">
            <img
                src={img.src}
                className="w-full flex justify-center"
                alt={img.alt}
            ></img>
        </div>
    );
}
