import { Category, Prisma } from "@prisma/client"
import { Form } from "src/core/components/form/Form"
import RadioButtonsField from "src/core/components/form/RadioButtonsField"
import { FormPropsWithOnChange } from "src/core/components/form/FormPropsWithOnChange"
import { FormSpy } from "react-final-form"
import { z } from "zod"
import { useTranslation } from "react-i18next"

interface CategoryFilterProps<S> extends FormPropsWithOnChange<any> {
  categories: Category[]
}

const CategoryFilter = <S extends z.ZodType<any, any>>(props: CategoryFilterProps<S>) => {
  const { categories, title } = props
  const { t, i18n } = useTranslation()
  let viewCategories = [{ label: i18n.language === "ru" ? "Все" : "All", value: 0 }] as any

  categories.forEach((category) =>
    viewCategories.push({
      label: i18n.language === "ru" ? category.titleRu : category.titleEn,
      value: category.id,
    })
  )

  return (
    <div>
      <Form<S> {...props}>
        <FormSpy
          subscription={{ values: true }}
          onChange={(data) => {
            let filterFormatted: Prisma.ItemWhereInput = {}
            if (data.values.categoryId === 0) {
              filterFormatted = {}
            } else filterFormatted.categoryId = data.values.categoryId
            props._onChange(filterFormatted)
          }}
        />

        <RadioButtonsField
          name={"categoryId"}
          defaultValue={viewCategories[0]}
          options={viewCategories}
        />
      </Form>
    </div>
  )
}

export default CategoryFilter
