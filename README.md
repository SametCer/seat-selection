# Koltuk Seçim Arayüzü Projesi

Bu proje, bir etkinlik için kullanıcıların koltuk seçimi yapabileceği interaktif ve görsel bir arayüz sunar. Uygulama tamamen local olarak çalışır; herhangi bir backend, API veya socket bağlantısı içermez.

## Özellikler

- Boş, dolu ve rezerve koltuklar farklı şekilde görselleştirilmiştir
- Boş koltuklar seçilebilir ve seçim iptal edilebilir
- Seçilen koltukların numaraları listelenir
- Responsive tasarım (mobil ve masaüstü uyumlu)
- Kod yapısı temiz ve okunabilir

## Kurulum

Projeyi klonladıktan sonra bağımlılıkları yükleyin:

```bash
git clone https://github.com/SametCer/seat-selection.git
cd seat-selection
npm install
# veya yarn install
```

## Geliştirme sunucusunu başlat:

```bash
npm run dev
# veya
yarn dev
```

Tarayıcıdan **http://localhost:3000** adresine giderek projeyi görüntüleyebilirsin.

## Kullanılan Teknolojiler

- **Next.js**
- **React**
- **Tailwind CSS**
- **Shadcn UI**

## Proje Yapısı

```
/src
 ├── components  # Yeniden kullanılabilir bileşenler
 ├── hooks       # Özel hook'lar
 ├── assets      # Görseller, ikonlar ve diğer statik dosyalar
 ├── lib         # Yardımcı fonksiyonlar, util dosyaları, statik veriler
 ├── types       # TypeScript tip tanımlamaları ve arabirimler (interfaces)
```
