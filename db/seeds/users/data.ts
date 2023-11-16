import { LocaleEnum, UserRoleEnum } from "db"

export interface CreateUserSeedDb {
  email: string
  username: string
  firstName: string
  lastName: string
  role: UserRoleEnum
  locale: LocaleEnum
  location: {
    lat: number
    lng: number
    cityEn: string
    cityRu: string
    addressRu: string
    addressEn: string
    postalCode: string
    phone: string
  }
  country: {
    id: string
    titleEn: string
    titleRu: string
  }
}

export const password = process.env.PASS ?? "100uhfvv"
export const users = {
  // admins
  roma: {
    email: "ketayo1@gmail.com",
    username: "roma",
    firstName: "Роман",
    lastName: "Степанов",
    role: UserRoleEnum.ADMIN,
    locale: LocaleEnum.ru,
    country: { id: "id", titleEn: "Indonesia", titleRu: "Индонезия" },
    location: {
      lat: -6.2290269,
      lng: 106.8295176,
      cityEn: "Jakarta",
      cityRu: "Джакарта",
      addressEn: "Jalan H.R. Rasuna Said, Kav. X-7, No 1-2, Kuningan",
      addressRu: "",
      postalCode: "12950",
      phone: "+62-21-522-29-12",
    },
  } as CreateUserSeedDb,
  videolimiter: {
    email: "videolimiter@gmail.com",
    username: "videolimiter",
    firstName: "Роман",
    lastName: "Палыч",
    role: UserRoleEnum.ADMIN,
    locale: LocaleEnum.ru,
    country: { id: "ru", titleEn: "Russian Federation", titleRu: "Российская Федерация" },
    location: {
      lat: 55.7901789,
      lng: 37.5148139,
      cityEn: "Moscow",
      cityRu: "Москва",
      addressEn: "ул. 3-я Песчаная, д. 2А",
      addressRu: "st. 3 Peschanaya, 2A",
      postalCode: "125252",
      phone: "+7 495 956-20-67",
    },
  } as CreateUserSeedDb,
  mkdir: {
    email: "mkdir.web.dev@gmail.com",
    username: "mkdir",
    firstName: "Михаил",
    lastName: "Корюков",
    role: UserRoleEnum.ADMIN,
    locale: LocaleEnum.ru,
    country: { id: "me", titleEn: "Montenegro", titleRu: "Черногория" },
    location: {
      lat: 42.4533527,
      lng: 19.2639884,
      cityEn: "Podgorica",
      cityRu: "Подгорица",
      addressEn: "1 Veliše Mugoše",
      addressRu: "ул. Велише Мугоше, д.1",
      postalCode: "81000",
      phone: "(+382-20) 272-460",
    },
  } as CreateUserSeedDb,

  // moderators
  moderator: {
    email: "example-moderator@mail.com",
    username: "moderator",
    firstName: "Сергей",
    lastName: "Сергеев",
    role: UserRoleEnum.MODERATOR,
    locale: LocaleEnum.ru,
    country: { id: "nl", titleEn: "Netherlands", titleRu: "Нидерланды" },
    location: {
      lat: 52.0988899,
      lng: 4.2752042,
      cityEn: "Den Haag",
      cityRu: "Гаага",
      addressEn: "Andries Bickerweg 2",
      addressRu: "",
      postalCode: "2517",
      phone: "+31(0)70 346 8888",
    },
  } as CreateUserSeedDb,

  // users
  user: {
    email: "example-user@mail.com",
    username: "user",
    firstName: "Иван",
    lastName: "Иванов",
    role: UserRoleEnum.USER,
    locale: LocaleEnum.ru,
    country: { id: "us", titleEn: "United States", titleRu: "США" },
    location: {
      lat: 38.9242497,
      lng: -77.074012,
      cityEn: "Washington",
      cityRu: "Вашингтон",
      addressEn: "2650 Wisconsin Ave., N.W.",
      addressRu: "",
      postalCode: "20007",
      phone: "(202) 298-5700",
    },
  } as CreateUserSeedDb,
}
