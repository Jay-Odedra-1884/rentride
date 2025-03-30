import Image from "next/image";

function Badge({ text, image, imageHeight = 32, imageWidth = 32, height = "h-9", width = "w-52", className}) {
  return (
    <div className={`${width} ${height} rounded-md flex items-center justify-center text-md bg-[#1572D31A] text-[#1572D3] font-semibold ${className} `}>
         {image ? (
        <Image src={image} alt="Badge Icon" width={imageHeight} height={imageWidth} className="object-contain" />
      ) : (
        text
      )}
    </div>
  );
}

export default Badge;
