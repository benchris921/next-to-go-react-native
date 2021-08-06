export type Race = {
  race_id: string,
  race_name: string,
  race_number: string,
  meeting_id: string,
  meeting_name: string,
  category_id: string,
  advertised_start: { seconds: number }
}