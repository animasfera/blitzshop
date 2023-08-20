import React from "react"
import { useTranslation } from "react-i18next"
import { Category, Image, ImageToItem, Item, Price, Prisma } from "db"

import {
  StatsSimple,
  DataStats,
} from "src/core/tailwind-ui/marketing/page-sections/stats/StatsSimple"
import { HeroSplitWithImage } from "src/core/tailwind-ui/marketing/page-sections/hero-sections/HeroSplitWithImage"
import { ProductListHorizontalScrolling } from "src/core/tailwind-ui/ecommerce/components/product-lists/ProductListHorizontalScrolling"

interface HomeProps {
  offers: Array<DataStats>
  items: Array<
    Item & {
      amount: Price
      category: Category | null
      _count: Prisma.ItemCountOutputType
      coverImage: ImageToItem & {
        image: Image
      }
    }
  >
}

export const Home = (props: HomeProps) => {
  const { offers, items } = props

  const { t } = useTranslation(["pages.home"])

  return (
    <>
      <div className="flex flex-col">
        <div className="order-last lg:order-first">
          <StatsSimple data={offers} />
        </div>

        <HeroSplitWithImage
          title={t("hero.title")}
          subtitle={t("hero.subtitle")}
          button={{ text: t("hero.button"), href: "/products" }}
          image={"https://tailwindui.com/img/ecommerce-images/home-page-02-hero-half-width.jpg"}
        />
      </div>

      <section aria-labelledby={t("products.title")}>
        <ProductListHorizontalScrolling
          title={t("products.title")}
          // TODO: Router
          link={{ text: t("products.link"), url: "/products" }}
          items={items}
        />
      </section>
    </>
  )
}

export default Home

const collections = [
  {
    name: "Desk and Office",
    description: "Work from home accessories",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "#",
  },
  {
    name: "Self-Improvement",
    description: "Journals and note-taking",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "#",
  },
  {
    name: "Travel",
    description: "Daily commute essentials",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
]
const testimonials = [
  {
    id: 1,
    quote:
      "My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!",
    attribution: "Sarah Peters, New Orleans",
  },
  {
    id: 2,
    quote:
      "I had to return a purchase that didn’t fit. The whole process was so simple that I ended up ordering two new items!",
    attribution: "Kelly McPherson, Chicago",
  },
  {
    id: 3,
    quote:
      "Now that I’m on holiday for the summer, I’ll probably order a few more shirts. It’s just so convenient, and I know the quality will always be there.",
    attribution: "Chris Paul, Phoenix",
  },
]

/*
{
  // Collections
}
      <section aria-labelledby="collections-heading" className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 id="collections-heading" className="text-2xl font-bold text-gray-900">
              Collections
            </h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {collections.map((collection) => (
                <div key={collection.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={collection.imageSrc}
                      alt={collection.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={collection.href}>
                      <span className="absolute inset-0" />
                      {collection.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{collection.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

{
  // Sale and testimonials
      }
      <div className="relative overflow-hidden">
        {
        // Decorative background image and gradient
        }
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-white bg-opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
        </div>

        {
          // Sale
        }
        <section
          aria-labelledby="sale-heading"
          className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2
              id="sale-heading"
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              Get 25% off during our one-time sale
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
              Most of our products are limited releases that won't come back. Get your favorite
              items while they're in stock.
            </p>
            <a
              href="#"
              className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto"
            >
              Get access to our one-time sale
            </a>
          </div>
        </section>

        {
          // Testimonials
        }
        <section
          aria-labelledby="testimonial-heading"
          className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2
              id="testimonial-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              What are people saying?
            </h2>

            <div className="mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.id} className="sm:flex lg:block">
                  <svg
                    width={24}
                    height={18}
                    viewBox="0 0 24 18"
                    aria-hidden="true"
                    className="flex-shrink-0 text-gray-300"
                  >
                    <path
                      d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                    <p className="text-lg text-gray-600">{testimonial.quote}</p>
                    <cite className="mt-4 block font-semibold not-italic text-gray-900">
                      {testimonial.attribution}
                    </cite>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      </div>
*/