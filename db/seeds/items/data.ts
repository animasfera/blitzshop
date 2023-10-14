import { ItemStatusEnum, AccessTypeEnum, CurrencyEnum } from "db"
import { categories } from "db/seeds/categories/data"

import { ItemSeed } from "./types"

const { floorPlayingFields, tablePlayingFields, cubes, books } = categories

export const items = {
  agniMini: {
    title: "Малое напольное игровое поле «Агни (огонь)»",
    status: ItemStatusEnum.SALE,
    coverImage: {
      image: {
        title: "Малое напольное игровое поле «Агни (огонь)»",
        description: "2,8х2,1м",
        url: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/d5bd13f36f9f218b1e430cc02df4a945.jpg/s/500x/a/376153/sc/234",
      },
    },
    amount: {
      amount: 1500000,
      currency: CurrencyEnum.EUR,
    },
    category: floorPlayingFields,
  } as ItemSeed,
  agniBig: {
    title: "Большое напольное игровое поле «Агни (огонь)»",
    access: AccessTypeEnum.PRIVATE,
    // status: ItemStatusEnum.OUT_OF_STOCK,
    coverImage: {
      image: {
        title: "Большое напольное игровое поле «Агни (огонь)»",
        description: "3,2х2,4 м",
        url: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/d5bd13f36f9f218b1e430cc02df4a945.jpg/s/500x/a/376153/sc/234",
      },
    },
    amount: {
      amount: 20000,
      currency: CurrencyEnum.USD,
    },
    category: floorPlayingFields,
  } as ItemSeed,
  prithviMini: {
    title: "Малое напольное игровое поле «Притхви (земля)»",
    access: AccessTypeEnum.PRIVATE,
    status: ItemStatusEnum.OUT_OF_STOCK,
    coverImage: {
      image: {
        title: "Малое напольное игровое поле «Притхви (земля)»",
        description: "2,8х2,1 м",
        url: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/d09f9d7a74ae21fc63439043bcebbf19.jpg/s/500x/a/376153/sc/291",
      },
    },
    amount: {
      amount: 11500,
      currency: CurrencyEnum.EUR,
    },
    category: floorPlayingFields,
  } as ItemSeed,
  prithviBig: {
    title: "Большое напольное игровое поле «Притхви (земля)»",
    access: AccessTypeEnum.LINK,
    status: ItemStatusEnum.DRAFT,
    coverImage: {
      image: {
        title: "Большое напольное игровое поле «Притхви (земля)»",
        description: "3,2х2,4 м",
        url: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/d09f9d7a74ae21fc63439043bcebbf19.jpg/s/500x/a/376153/sc/291",
      },
    },
    amount: {
      amount: 1500000,
      currency: CurrencyEnum.EUR,
    },
    category: floorPlayingFields,
  } as ItemSeed,
  jalaMini: {
    title: "Малое настольное игровое поле «Джала (вода)»",
    status: ItemStatusEnum.BLOCKED,
    coverImage: {
      image: {
        title: "Малое настольное игровое поле «Джала (вода)»",
        description: "50х60 см",
        url: "https://fs-thb02.getcourse.ru/fileservice/file/thumbnail/h/a3180e4b6c1a1b670e0c10be4f220287.jpg/s/500x/a/376153/sc/114",
      },
    },
    amount: {
      amount: 5000,
      currency: CurrencyEnum.USD,
    },
    category: tablePlayingFields,
  } as ItemSeed,
  jalaBig: {
    title: "Большое настольное игровое поле «Джала (вода)»",
    access: AccessTypeEnum.LINK,
    status: ItemStatusEnum.HIDDEN,
    coverImage: {
      image: {
        title: "Большое настольное игровое поле «Джала (вода)»",
        description: "1,2х1,5 м",
        url: "https://fs-thb02.getcourse.ru/fileservice/file/thumbnail/h/a3180e4b6c1a1b670e0c10be4f220287.jpg/s/500x/a/376153/sc/114",
      },
    },
    amount: {
      amount: 6500,
      currency: CurrencyEnum.EUR,
    },
    category: tablePlayingFields,
  } as ItemSeed,
  vayoMini: {
    title: "Малое настольное игровое поле «Вайю (воздух)»",
    status: ItemStatusEnum.HIDDEN,
    coverImage: {
      image: {
        title: "Малое настольное игровое поле «Вайю (воздух)»",
        description: "50х60 см",
        url: "https://fs-thb02.getcourse.ru/fileservice/file/thumbnail/h/1a6fec44fa1b52c5a5819b0be757fe3a.jpg/s/500x/a/376153/sc/330",
      },
    },
    amount: {
      amount: 4000,
      currency: CurrencyEnum.USD,
    },
    category: tablePlayingFields,
  } as ItemSeed,
  vayoBig: {
    title: "Большое настольное игровое поле «Вайю (воздух)»",
    access: AccessTypeEnum.PRIVATE,
    status: ItemStatusEnum.SALE,
    coverImage: {
      image: {
        title: "Большое настольное игровое поле «Вайю (воздух)»",
        description: "1,2х1,5 м",
        url: "https://fs-thb02.getcourse.ru/fileservice/file/thumbnail/h/1a6fec44fa1b52c5a5819b0be757fe3a.jpg/s/500x/a/376153/sc/330",
      },
    },
    amount: {
      amount: 5000,
      currency: CurrencyEnum.EUR,
    },
    category: tablePlayingFields,
  } as ItemSeed,
  yamunaMini: {
    title: "Малое настольное игровое поле «Вайю (воздух)»",
    access: AccessTypeEnum.LINK,
    coverImage: {
      image: {
        title: "Малое настольное игровое поле «Вайю (воздух)»",
        description: "50х60 см",
        url: "https://fs-thb01.getcourse.ru/fileservice/file/thumbnail/h/a2eb32e1c1a872965e655640016fd364.jpeg/s/500x/a/376153/sc/44",
      },
    },
    amount: {
      amount: 380000,
      currency: CurrencyEnum.EUR,
    },
    category: tablePlayingFields,
  } as ItemSeed,
  yantar: {
    title: "Маленький кубик из янтаря",
    access: AccessTypeEnum.LINK,
    status: ItemStatusEnum.SALE,
    coverImage: {
      image: {
        title: "Маленький кубик из янтаря",
        description: "Цвет: красный прозрачный, желтый прозрачный, желтый матовый 1,3х1,3 см.",
        url: "https://fs-thb02.getcourse.ru/fileservice/file/thumbnail/h/19346a478393cd2f54f34c0ecf276d38.jpg/s/500x/a/376153/sc/110",
      },
    },
    amount: {
      amount: 400,
      currency: CurrencyEnum.USD,
    },
    category: cubes,
  } as ItemSeed,
  moryoniyDub: {
    title: "Кубик из мореного дуба",
    access: AccessTypeEnum.PRIVATE,
    status: ItemStatusEnum.DRAFT,
    coverImage: {
      image: {
        title: "Кубик из мореного дуба",
        description: "3,5х3,5 см",
        url: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/2ace8f92950aec633b33b4cdbed7f562.jpg/s/500x/a/376153/sc/337",
      },
    },
    amount: {
      amount: 4500,
      currency: CurrencyEnum.EUR,
    },
    category: cubes,
  } as ItemSeed,
  amarant: {
    title: "Кубик из амаранта",
    status: ItemStatusEnum.OUT_OF_STOCK,
    coverImage: {
      image: {
        title: "Кубик из амаранта",
        description: "3,5х3,5 см.",
        url: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/5df81fe032e34c5c56e335f3e050837b.jpg/s/500x/a/376153/sc/145",
      },
    },
    amount: {
      amount: 500000,
      currency: CurrencyEnum.EUR,
    },
    category: cubes,
  } as ItemSeed,
  zebrano: {
    title: "Кубик из зебрано",
    status: ItemStatusEnum.BLOCKED,
    access: AccessTypeEnum.LINK,
    coverImage: {
      image: {
        title: "Кубик из зебрано",
        description: "3,5х3,5 см.",
        url: "https://fs-thb02.getcourse.ru/fileservice/file/thumbnail/h/004de75e9d80ceb3ca198a9f5f528eb9.jpg/s/500x/a/376153/sc/304",
      },
    },
    amount: {
      amount: 5000,
      currency: CurrencyEnum.USD,
    },
    category: cubes,
  } as ItemSeed,
  paduk: {
    title: "Кубик из падука",
    status: ItemStatusEnum.HIDDEN,
    access: AccessTypeEnum.PRIVATE,
    coverImage: {
      image: {
        title: "Кубик из падука",
        description: "5х5 см.",
        url: "https://fs-thb01.getcourse.ru/fileservice/file/thumbnail/h/c1eaeedbcca2393df088b8d9691abf06.jpg/s/500x/a/376153/sc/434",
      },
    },
    amount: {
      amount: 10000,
      currency: CurrencyEnum.EUR,
    },
    category: cubes,
  } as ItemSeed,
  bubing: {
    title: "Кубик из бубинга",
    status: ItemStatusEnum.DRAFT,
    coverImage: {
      image: {
        title: "Кубик из бубинга",
        description: "5х5 см.",
        url: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/6ec2ea97ec0e25ed3d2028d933e72315.jpg/s/500x/a/376153/sc/192",
      },
    },
    amount: {
      amount: 950000,
      currency: CurrencyEnum.EUR,
    },
    category: cubes,
  } as ItemSeed,
  venge: {
    title: "Кубик из венге",
    coverImage: {
      image: {
        title: "Кубик из венге",
        description: "5х5 см.",
        url: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/6ec9eb55ffc6d1e402db6d45ca2fc43e.jpg/s/500x/a/376153/sc/433",
      },
    },
    amount: {
      amount: 9500,
      currency: CurrencyEnum.USD,
    },
    category: cubes,
  } as ItemSeed,
  leela: {
    title: "Лила — мастерство жизни",
    status: ItemStatusEnum.BLOCKED,
    access: AccessTypeEnum.PRIVATE,
    coverImage: {
      image: {
        title: "Лила — мастерство жизни",
        description: "Печатная версия книги (мягкий переплет)",
        url: "https://fs-thb02.getcourse.ru/fileservice/file/thumbnail/h/44dc6533dbaf60bf014bcc54aa0b75d0.png/s/500x/a/376153/sc/309",
      },
    },
    amount: {
      amount: 180000,
      currency: CurrencyEnum.EUR,
    },
    category: books,
  } as ItemSeed,
  master: {
    title: "Путь мастера. Умение действовать",
    status: ItemStatusEnum.OUT_OF_STOCK,
    access: AccessTypeEnum.LINK,
    coverImage: {
      image: {
        title: "Путь мастера. Умение действовать",
        description: "Печатная версия книги (твердый переплет)",
        url: "https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/76018f357c8b1d2f12721fd1dc45f02c.png/s/500x/a/376153/sc/136",
      },
    },
    amount: {
      amount: 5000,
      currency: CurrencyEnum.USD,
    },
    category: books,
  } as ItemSeed,
}
