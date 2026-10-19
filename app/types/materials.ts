export interface Material {
  id: number | string
  title: string
  short_description: string
  datetime: string
  description_html?: string
  description_json?: string
}

export type CreateMaterialPayload = Pick<
  Material,
  'title' | 'short_description' | 'datetime' | 'description_html' | 'description_json'
>
