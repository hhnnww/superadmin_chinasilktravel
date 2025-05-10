import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/travel/city/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/travel_products/city/"!</div>
}
