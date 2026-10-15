import english from '@/messages/en.json'
import hindi from '@/messages/hi.json'
import hinglish from '@/messages/hi-Latn.json'
import spanish from '@/messages/es.json'
import scaffold from '@/messages/scaffold.json'
import type { Language } from '@/lib/locale'

const dictionaries: Partial<Record<Language, Record<string, string>>> = {
  en: english,
  hi: hindi,
  'hi-Latn': hinglish,
  es: spanish,
  fr: scaffold,
  de: scaffold,
  pt: scaffold,
  ar: scaffold,
  ja: scaffold,
  ko: scaffold,
  'zh-CN': scaffold,
  id: scaffold,
  tr: scaffold,
  ru: scaffold,
}

export function getMessage(language: Language, key: string): string {
  const localized = dictionaries[language]?.[key]
  return localized || english[key as keyof typeof english] || key
}

export function getReplyForLanguage(language: Language, country: string): string {
  const replies: Partial<Record<Language, string>> = {
    en: 'I found a flexible fare and asked the hotel for a better bundled rate.',
    hi: 'मुझे एक लचीला किराया मिला है और मैंने होटल से बेहतर पैकेज दर पूछी है।',
    'hi-Latn': 'Ek flexible fare mila hai. Hotel se better bundled rate bhi poochha hai.',
    es: 'Encontré una tarifa flexible y pedí al hotel un mejor precio combinado.',
    fr: 'J’ai trouvé un tarif flexible et demandé à l’hôtel un meilleur prix avec hébergement.',
    de: 'Ich habe einen flexiblen Tarif gefunden und das Hotel um einen besseren Paketpreis gebeten.',
    pt: 'Encontrei uma tarifa flexível e pedi ao hotel um preço melhor com hospedagem.',
    ar: 'وجدت سعرًا مرنًا وطلبت من الفندق عرضًا أفضل يشمل الإقامة.',
    ja: '柔軟な運賃を見つけ、ホテルに宿泊込みのよりお得な料金を尋ねました。',
    ko: '유연한 요금을 찾았고 호텔에 숙박이 포함된 더 나은 가격을 문의했어요.',
    'zh-CN': '我找到了灵活票价，也向酒店询问了更优惠的住宿套餐。',
    id: 'Saya menemukan tarif fleksibel dan meminta harga paket menginap yang lebih baik.',
    tr: 'Esnek bir ücret buldum ve otelden konaklama dahil daha iyi bir paket fiyatı istedim.',
    ru: 'Я нашёл гибкий тариф и попросил отель предложить более выгодную цену с проживанием.',
  }
  const local = country === 'IN' && language === 'en'
    ? 'I found a flexible fare and asked whether the stay can be bundled for a better total.'
    : undefined
  return replies[language] ?? local ?? replies.en!
}

export function getTranslatedVendorMessage(language: Language): string {
  const translated: Record<Language, string> = {
    en: 'We can offer a flexible fare. Would a bundled stay help your plans?',
    hi: 'हम लचीला किराया दे सकते हैं। क्या ठहरने की जगह जोड़ना आपके काम आएगा?',
    'hi-Latn': 'Hum flexible fare de sakte hain. Kya stay bundle aapke kaam aayega?',
    es: 'Podemos ofrecer una tarifa flexible. ¿Te ayudaría combinarla con el alojamiento?',
    fr: 'Nous pouvons proposer un tarif flexible. Un séjour groupé vous conviendrait-il ?',
    de: 'Wir können einen flexiblen Tarif anbieten. Wäre ein Aufenthaltspaket für Sie interessant?',
    pt: 'Podemos oferecer uma tarifa flexível. Um pacote com hospedagem ajudaria?',
    ar: 'يمكننا تقديم سعر مرن. هل يناسبك عرض يشمل الإقامة؟',
    ja: '柔軟な料金をご案内できます。宿泊とのセットプランはいかがですか？',
    ko: '유연한 요금을 제공할 수 있어요. 숙박을 묶은 상품은 어떠세요?',
    'zh-CN': '我们可以提供灵活票价。住宿套餐是否更适合您的行程？',
    id: 'Kami dapat menawarkan tarif fleksibel. Apakah paket dengan penginapan cocok untuk Anda?',
    tr: 'Esnek bir ücret sunabiliriz. Konaklama paketi planınıza uyar mı?',
    ru: 'Мы можем предложить гибкий тариф. Вам подойдёт пакет с проживанием?',
  }
  return translated[language]
}

export const scaffoldLanguages: Language[] = [
  'fr', 'de', 'pt', 'ar', 'ja', 'ko', 'zh-CN', 'id', 'tr', 'ru',
]
