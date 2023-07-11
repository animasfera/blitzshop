const throwError = (msg: string) => {
  console.error(msg)
  throw new Error(msg)
}
export default throwError
