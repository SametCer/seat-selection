export default function Header() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <div className="text-xl md:text-2xl font-bold">SmtCrzc</div>
        {/*Arama alanı görsel amaçlı eklendi,autoComplete görevi görmemektedir*/}
        <div className="flex justify-center w-full text-black">
          <input
            type="text"
            placeholder="Etkinlik Bul..."
            className="bg-white w-2/3 md:w-1/2 rounded-2xl p-2 "
          />
        </div>
      </div>
    </div>
  );
}
