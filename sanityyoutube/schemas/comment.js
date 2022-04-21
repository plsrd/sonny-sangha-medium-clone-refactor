export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'post',
      type: 'reference',
      to: [{ type: 'post' }],
    },
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'approved',
      type: 'boolean',
      description: "Comments won't show on the site without approval",
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'comment',
      type: 'text',
    },
  ],
}
