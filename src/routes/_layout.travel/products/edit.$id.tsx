import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/travel/products/edit/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/travel_products/products/edit"!</div>
}
