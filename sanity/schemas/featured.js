import {defineField, defineType} from 'sanity'
import restaurant from './restaurant'

export default defineType({
  name: 'featured',
  title: 'Featured Menu categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Featured of Category Name',
      validation: (rule) => rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: (rule) => rule.max(200),
    },
    {
      name: 'restaurants',
      type: 'array',
      title: 'Restaurants',
      of: [{type: 'reference', to: [{type: 'restaurant'}]}],
    },
  ],
})
