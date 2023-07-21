import { FormProps } from "./Form"

export interface FormPropsWithOnChange<S> extends FormProps<any> {
  _onChange: (values: { [key: string]: any }) => void
}
