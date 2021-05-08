export interface Outcome<T> {
  isSuccessful: boolean
  message: string
  data?: T
}
